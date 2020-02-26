export type Vector2D = [number, number];

const vec2Magnitude = (x: number, y: number): number => {
    return Math.sqrt(x * x + y * y);
};

const zero = (): Vector2D => {
    return [0, 0];
};

const from = (x: number, y: number): Vector2D => {
    return [x, y];
};

const set = (vec: Vector2D, x = 0, y = 0): void => {
    vec[0] = x;
    vec[1] = y;
};

const copy = (v1: Vector2D, v2: Vector2D): void => {
    v1[0] = v2[0];
    v1[1] = v2[1];
};

const add = (v1: Vector2D, v2: Vector2D): void => {
    v1[0] += v2[0];
    v1[1] += v2[1];
};

const sub = (v1: Vector2D, v2: Vector2D): void => {
    v1[0] -= v2[0];
    v1[1] -= v2[1];
};

const distance = (v1: Vector2D, v2: Vector2D): number => {
    return vec2Magnitude(v1[0] - v2[0], v1[1] - v2[1]);
};

const rotate = (vec: Vector2D, angle: number, center?: Vector2D): void => {
    const cx = center ? center[0] : 0;
    const cy = center ? center[1] : 0;
    const sinC = Math.sin(angle);
    const cosC = Math.cos(angle);

    // move vector to center of rotation
    vec[0] -= cx;
    vec[1] -= cy;

    // rotate vector
    const px = vec[0] * cosC - vec[1] * sinC;
    const py = vec[0] * sinC + vec[1] * cosC;

    // move rotated vector back
    vec[0] = px + cx;
    vec[1] = py + cy;
};

const scale = (vec: Vector2D, scale: Vector2D | number): void => {
    if (scale instanceof Array) {
        vec[0] *= scale[0];
        vec[1] *= scale[1];
    } else {
        vec[0] *= scale;
        vec[1] *= scale;
    }
};

export const vec2 = {
    zero, from, set, copy, add, sub, distance, rotate, scale
};
