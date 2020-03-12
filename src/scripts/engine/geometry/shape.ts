import { Vector2D, vec2 } from 'engine/geometry/vector';

export interface Shape<T extends string> {
    readonly type: T;
    readonly position: Vector2D;
}

export const createShape = <T extends string, U extends Shape<T>>(type: T, x = 0, y = 0): U => {
    return {
        type,
        position: vec2.from(x, y)
    } as U;
};
