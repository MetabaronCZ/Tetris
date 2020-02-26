import { UV, createUV } from 'engine/graphics/uv';
import { Quad, createQuad } from 'engine/graphics/quad';
import { Rectangle, createRectangle } from 'engine/geometry/rectangle';

export interface Outline {
    readonly shape: Rectangle;
    readonly vertices: Quad;
    readonly uv: UV;
}

export const createOutline = (width: number, height: number, x = 0, y = 0, rot = 0): Outline => {
    return {
        shape: createRectangle(width, height, x, y, rot),
        vertices: createQuad(),
        uv: createUV()
    };
};
