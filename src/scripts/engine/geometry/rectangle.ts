import { Vector2D, vec2 } from 'engine/geometry/vector';
import { Shape, createShape } from 'engine/geometry/shape';

// point to check
const check = vec2.zero();

export interface Rectangle extends Shape<'RECTANGLE'> {
    readonly width: number;
    readonly height: number;
    readonly rotation: number;
}

export const createRectangle = (width: number, height: number, x = 0, y = 0, rot = 0): Rectangle => {
    return {
        ...createShape('RECTANGLE', x, y),
        rotation: rot,
        width,
        height
    };
};

export const pointInRectangle = (rectangle: Rectangle, point: Vector2D): boolean => {
    const { position, rotation, width, height } = rectangle;

    const [x, y] = position;
    const left = x - width / 2;
    const right = x + width / 2;
    const top = y + height / 2;
    const bottom = y - height / 2;

    // rotate point in reverse angle of rectangle rotation
    vec2.copy(check, point);
    vec2.rotate(check, rotation, position);

    const [px, py] = check;
    return (px >= left && px <= right && py <= top && py >= bottom);
};
