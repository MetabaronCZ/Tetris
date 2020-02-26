import { Quad } from 'engine/graphics/quad';
import { vec2, Vector2D } from 'engine/geometry/vector';

// view corner vertices
const viewVertices: Readonly<Vector2D[]> = [
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
    width: width,
    height: height,
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
    view.scale = vec2.from(2 * scale / view.width, 2 * scale / view.height);
};

export const pointInView = (v: Vector2D): boolean => {
    return v[0] >= -1 && v[1] >= -1 && v[0] <= 1 && v[1] <= 1;
};

export const quadInView = (vertices: Quad): boolean => {
    // check rectangle vertices in view
    for (let i = 0, imax = vertices.length; i < imax;+ i++) {
        if (3 === i || 4 === i) {
            continue; // duplicite vertices
        }
        if (pointInView(vertices[i])) {
            return true;
        }
    }

    // check view corners in rectangle
    const ax = vertices[0][0];
    const ay = vertices[0][1];
    const bx = vertices[1][0];
    const by = vertices[1][1];
    const cx = vertices[5][0];
    const cy = vertices[5][1];

    const ABx = bx - ax;
    const ABy = by - ay;
    const BCx = cx - bx;
    const BCy = cy - by;
    const dotAB = ABx * ABx + ABy * ABy;
    const dotBC = BCx * BCx + BCy * BCy;

    for (const v of viewVertices) {
        const dotABAV = ABx * (v[0] - ax) + ABy * (v[1] - ay);
        const dotBCBV = BCx * (v[0] - bx) + BCy * (v[1] - by);

        if (dotABAV >= 0 && dotAB >= dotABAV && dotBCBV >= 0 && dotBC >= dotBCBV) {
            return true;
        }
    }

    return false;
};
