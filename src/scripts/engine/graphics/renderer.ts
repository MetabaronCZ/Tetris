import {
    RENDER_SCALE, DISTANCE_TO_PIXEL_RATIO,
    DEBUG_SPRITE, DEBUG_POINT_SIZE, DEBUG_POINT_COLOR, DEBUG_OUTLINE_COLOR
} from 'engine/data/config';

import { Color } from 'engine/graphics/color';
import { Sprite } from 'engine/graphics/sprite';
import { Outline } from 'engine/graphics/outline';
import { Camera } from 'engine/ecs/entities/camera';
import { Rectangle } from 'engine/geometry/rectangle';
import { vec2, Vector2D } from 'engine/geometry/vector';
import { Quad, updateQuad } from 'engine/graphics/quad';
import { View, pointInView, quadInView, updateView } from 'engine/view';

import { renderPoints, PointRender, PointRenderObject } from 'engine/graphics/program/point';
import { renderSprites, SpriteRender, SpriteRenderObject } from 'engine/graphics/program/sprite';
import { renderCircles, CircleRender, CircleRenderObject } from 'engine/graphics/program/circle';
import { renderRectangles, RectangleRender, RectangleRenderObject } from 'engine/graphics/program/rectangle';

export interface Texture {
    readonly id: number;
    readonly image: HTMLImageElement;
}

export type SpriteRenderData = [Vector2D, number, Quad, Rectangle, Sprite, Color];
export type OutlineRenderData = [Vector2D, number, Outline];

type OutlineRenderObject = RectangleRenderObject | CircleRenderObject;

const getOutlineRatio = (view: View, shape: Rectangle): [number, number] => {
    const wdt = DISTANCE_TO_PIXEL_RATIO * shape.width;
    const hgt = DISTANCE_TO_PIXEL_RATIO * shape.height;

    const outlineSize = view.originalWidth / (wdt * view.width);
    const outWidth = outlineSize * (wdt / hgt);
    const outHeight = outlineSize;

    return [outWidth, outHeight];
};

const updateOutlineData = (data: OutlineRenderData[], view: View, camera: Camera, target: OutlineRenderObject[], isAxes: boolean): void => {
    // reset outlines render data
    target.length = 0;

    // update render data
    for (const [pos, ori, outline] of data) {
        const { vertices, shape, uv } = outline;
        updateQuad(vertices, shape, pos, ori, view, camera);
    
        if (!isAxes && !quadInView(vertices)) {
            continue;
        }
        const outlineRatio = getOutlineRatio(view, shape);

        vertices.forEach((vertex, i) => {
            target.push({
                a_position: vertex,
                a_texcoord: uv[i],
                a_ratio: outlineRatio
            });
        });
    }
};

class Renderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly gl: WebGL2RenderingContext;

    private readonly renderSprites: SpriteRender;
    private readonly renderPoints?: PointRender;
    private readonly renderCircles?: CircleRender;
    private readonly renderRectangles?: RectangleRender;

    private readonly sprites: SpriteRenderObject[] = [];
    private readonly points: PointRenderObject[] = [];
    private readonly circles: CircleRenderObject[] = [];
    private readonly rectangles: RectangleRenderObject[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        const gl = canvas.getContext('webgl2', {
            alpha: false,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false
        });

        if (!gl) {
            throw new Error('Canvas WebGL2 context not supported');
        }
        this.gl = gl;

        this.renderSprites = renderSprites(gl);

        if (DEBUG_SPRITE) {
            this.renderPoints = renderPoints(gl);
            this.renderRectangles = renderRectangles(gl);
            this.renderCircles = renderCircles(gl);
        }
    }

    public setTextures(textures: Texture[]): void {
        const { gl } = this;

        for (const tex of textures) {
            const texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + tex.id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex.image);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.generateMipmap(gl.TEXTURE_2D);
        }
    }

    public start(view: View): void {
        const { gl } = this;

        this.resize(view);

        gl.viewport(view.x, view.y, view.width, view.height);
    
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);        
    }

    public renderSpriteData(data: SpriteRenderData[], view: View, camera: Camera): void {
        const { sprites } = this;

        // reset sprites render data
        sprites.length = 0;

        // prepare render data
        for (const [pos, ori, vertices, shape, sprite, color] of data) {
            updateQuad(vertices, shape, pos, ori, view, camera);

            if (!quadInView(vertices)) {
                continue;
            }
            vertices.forEach((vertex, i) => {
                sprites.push({
                    a_position: vertex,
                    a_texcoord: sprite.uv[i],
                    a_color: color
                });                
            });
        }

        // render sprites
        this.renderSprites({
            objects: sprites,
            uniforms: null
        });
    }

    public renderCircleData(data: OutlineRenderData[], view: View, camera: Camera): void {
        if (!this.renderCircles) {
            return;
        }
        const { circles } = this;
        updateOutlineData(data, view, camera, circles, false);

        this.renderCircles({
            objects: circles,
            uniforms: {
                u_outlinecolor: (gl, loc) => gl.uniform4fv(loc, DEBUG_OUTLINE_COLOR)
            }
        });
    }

    public renderRectangleData(data: OutlineRenderData[], view: View, camera: Camera, isAxes = false): void {
        if (!this.renderRectangles) {
            return;
        }
        const { rectangles } = this;
        updateOutlineData(data, view, camera, rectangles, isAxes);

        this.renderRectangles({
            objects: rectangles,
            uniforms: {
                u_outlinecolor: (gl, loc) => gl.uniform4fv(loc, DEBUG_OUTLINE_COLOR)
            }
        });
    }

    public renderPointData(data: Vector2D[], view: View, camera: Camera): void {
        if (!this.renderPoints) {
            return;
        }
        const { points } = this;

        // reset points render data
        points.length = 0;

        // update render data
        for (const point of data) {
            const center = vec2.from(point[0], point[1]);
            vec2.rotate(center, camera.orientation.get());
            vec2.sub(center, camera.position.get());
            vec2.scale(center, view.scale);
            vec2.scale(center, DISTANCE_TO_PIXEL_RATIO);
        
            if (pointInView(center)) {
                points.push({
                    a_position: center
                });
            }
        }

        // render points
        this.renderPoints({
            objects: points,
            uniforms: {
                u_pointsize: (gl, loc) => gl.uniform1f(loc, DEBUG_POINT_SIZE),
                u_pointcolor: (gl, loc) => gl.uniform4fv(loc, DEBUG_POINT_COLOR)
            }
        });
    }

    private resize(view: View): void {
        const { canvas } = this;
        const width = canvas.clientWidth * RENDER_SCALE;
        const height = canvas.clientHeight * RENDER_SCALE;
        const hasChanged = (width !== canvas.width || height !== canvas.height);

        if (hasChanged) {
            canvas.width = width;
            canvas.height = height;
            updateView(view, width, height);
        }
    }
}

export default Renderer;
