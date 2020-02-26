import { Vector2D, vec2 } from 'engine/geometry/vector';
import { Shape, createShape } from 'engine/geometry/shape';

export interface Circle extends Shape<'CIRCLE'> {
    readonly radius: number;
}

export const createCircle = (radius: number, x = 0, y = 0): Circle => {
    return {
        ...createShape('CIRCLE', x, y),
        radius
    };
};

export const pointInCircle = (circle: Circle, point: Vector2D): boolean => {
    const { position, radius } = circle;
    return vec2.distance(point, position) <= radius;
};
