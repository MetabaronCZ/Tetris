import { vec2, Vector2D } from 'engine/geometry/vector';

export type UV = Readonly<[Vector2D, Vector2D, Vector2D, Vector2D, Vector2D, Vector2D]>;

export const createUV = (x0 = 0, y0 = 0, x1 = 0, y1 = 0): UV => {
    return [
        vec2.from(x0, y1), vec2.from(x1, y1), vec2.from(x0, y0),
        vec2.from(x0, y0), vec2.from(x1, y1), vec2.from(x1, y0)
    ];
};
