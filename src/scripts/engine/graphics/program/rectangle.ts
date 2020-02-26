import { rectangleVS, rectangleFS } from 'data/shaders/rectangle';
import { createRenderProgram, UseProgram, RenderObject } from 'engine/graphics/program';

type RectangleAttributes = 'a_position' | 'a_texcoord' | 'a_ratio';
type RectangleUniforms = 'u_outlinecolor';

export type RectangleRender = UseProgram<RectangleAttributes, RectangleUniforms>;
export type RectangleRenderObject = RenderObject<RectangleAttributes>;

export const renderRectangles = (gl: WebGL2RenderingContext): RectangleRender => {
    return createRenderProgram<RectangleAttributes, RectangleUniforms>(gl, {
        primitives: 'TRIANGLES',
        vertexCount: 6,
        vertexShader: rectangleVS,
        fragmentShader: rectangleFS,
        attributes: {
            a_position: { size: 2 },
            a_texcoord: { size: 2 },
            a_ratio: { size: 2 }
        },
        uniforms: {
            u_outlinecolor: { type: 'FLOAT', size: 4, isVector: true, isStatic: true }
        }
    });
};
