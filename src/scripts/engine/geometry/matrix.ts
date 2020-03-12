import { Vector2D } from 'engine/geometry/vector';

export type Matrix3D = [
    number, number, number,
    number, number, number,
    number, number, number
];

// matrix presets
const unit = (): Matrix3D => {
    return [
        1, 0, 0,
        1, 1, 0,
        0, 0, 1
    ];
};

const translation = (vec: Vector2D): Matrix3D => {
    const [x, y] = vec;
    return [
        1, 0, 0,
        0, 1, 0,
        x, y, 1
    ];
};

const rotation = (angle: number): Matrix3D => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [
        +c, -s, +0,
        +s, +c, +0,
        +0, +0, +1
    ];
};

const scaling = (scale: Vector2D): Matrix3D => {
    const [x, y] = scale;
    return [
        x, 0, 0,
        0, y, 0,
        0, 0, 1
    ];
};

// matrix operations
const multiply = (m1: Matrix3D, m2: Matrix3D): Matrix3D => {
    const a11 = m1[0 * 3 + 0];
    const a12 = m1[0 * 3 + 1];
    const a13 = m1[0 * 3 + 2];
    const a21 = m1[1 * 3 + 0];
    const a22 = m1[1 * 3 + 1];
    const a23 = m1[1 * 3 + 2];
    const a31 = m1[2 * 3 + 0];
    const a32 = m1[2 * 3 + 1];
    const a33 = m1[2 * 3 + 2];

    const b11 = m2[0 * 3 + 0];
    const b12 = m2[0 * 3 + 1];
    const b13 = m2[0 * 3 + 2];
    const b21 = m2[1 * 3 + 0];
    const b22 = m2[1 * 3 + 1];
    const b23 = m2[1 * 3 + 2];
    const b31 = m2[2 * 3 + 0];
    const b32 = m2[2 * 3 + 1];
    const b33 = m2[2 * 3 + 2];

    return [
        b11 * a11 + b12 * a21 + b13 * a31,
        b11 * a12 + b12 * a22 + b13 * a32,
        b11 * a13 + b12 * a23 + b13 * a33,
        b21 * a11 + b22 * a21 + b23 * a31,
        b21 * a12 + b22 * a22 + b23 * a32,
        b21 * a13 + b22 * a23 + b23 * a33,
        b31 * a11 + b32 * a21 + b33 * a31,
        b31 * a12 + b32 * a22 + b33 * a32,
        b31 * a13 + b32 * a23 + b33 * a33
    ];
};

const translate = (m: Matrix3D, vec: Vector2D): Matrix3D => {
    const t = translation(vec);
    return multiply(m, t);
};

const rotate = (m: Matrix3D, angle: number): Matrix3D => {
    const r = rotation(angle);
    return multiply(m, r);
};

const scale = (m: Matrix3D, value: Vector2D): Matrix3D => {
    const s = scaling(value);
    return multiply(m, s);
};

export const mat3 = {
    unit, translate, rotate, scale
};
