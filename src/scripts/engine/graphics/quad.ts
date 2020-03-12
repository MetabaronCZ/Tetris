import { Rectangle } from 'engine/geometry/rectangle';
import { Vector2D, vec2 } from 'engine/geometry/vector';
import { viewVertices, pointInView } from 'engine/view';

export type Quad = Readonly<[Vector2D, Vector2D, Vector2D, Vector2D, Vector2D, Vector2D]>;

export const createQuad = (): Quad => {
    return [
        vec2.zero(), vec2.zero(), vec2.zero(),
        vec2.zero(), vec2.zero(), vec2.zero()
    ];
};

export const shapeQuad = (quad: Quad, shape: Rectangle): void => {
    const w2 = shape.width / 2;
    const h2 = shape.height / 2;

    vec2.set(quad[0], -w2, -h2);
    vec2.set(quad[1], +w2, -h2);
    vec2.set(quad[2], -w2, +h2);
    vec2.set(quad[3], -w2, +h2);
    vec2.set(quad[4], +w2, -h2);
    vec2.set(quad[5], +w2, +h2);

    for (const vertex of quad) {
        vec2.rotate(vertex, -shape.rotation); // rotate vertices around rectangle center (clock-wise)
        vec2.add(vertex, shape.position); // move vertices to rectangle center
    }
};

export const quadInView = (vertices: Quad): boolean => {
    // check rectangle vertices in view
    for (let i = 0, imax = vertices.length; i < imax; i++) {
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
