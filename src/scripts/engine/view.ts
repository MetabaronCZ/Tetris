import { vec2, Vector2D } from 'engine/geometry/vector';

// view corner vertices
export const viewVertices: Readonly<Vector2D[]> = [
    vec2.from(-1, -1), vec2.from(+1, -1),
    vec2.from(+1, +1), vec2.from(-1, +1)
];

export interface View {
    readonly originalWidth: number;
    readonly originalHeight: number;
    readonly ratio: number;
    x: number;
    y: number;
    width: number;
    height: number;
    canvasWidth: number;
    canvasHeight: number;
    scale: Vector2D;
}

export const createView = (width: number, height: number): View => ({
    x: 0,
    y: 0,
    width,
    height,
    canvasWidth: width,
    canvasHeight: height,
    ratio: width / height,
    originalWidth: width,
    originalHeight: height,
    scale: vec2.from(1, 1)
});

export const updateView = (view: View, width: number, height: number): void => {
    const newRatio = width / height;

    if (newRatio > view.ratio) {
        // scale + center horizontally
        view.y = 0;
        view.height = height;
        view.width = view.height * view.ratio;
        view.x = Math.floor((width - view.width) / 2);
    } else {
        // scale + center vertically
        view.x = 0;
        view.width = width;
        view.height = view.width / view.ratio;
        view.y = Math.floor((height - view.height) / 2);
    }

    view.canvasWidth = width;
    view.canvasHeight = height;

    const scale = view.width / view.originalWidth;
    view.scale = vec2.from((2 * scale) / view.width, (2 * scale) / view.height);
};

export const pointInView = (v: Vector2D): boolean => {
    return v[0] >= -1 && v[1] >= -1 && v[0] <= 1 && v[1] <= 1;
};
