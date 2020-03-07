import { DISTANCE_TO_PIXEL_RATIO } from 'engine/data/config';

import { View } from 'engine/view';
import { Camera } from 'engine/ecs/entities/camera';
import { Rectangle } from 'engine/geometry/rectangle';
import { Vector2D, vec2 } from 'engine/geometry/vector';

export type Quad = Readonly<[Vector2D, Vector2D, Vector2D, Vector2D, Vector2D, Vector2D]>;

export const createQuad = (): Quad => {
    return [
        vec2.zero(), vec2.zero(), vec2.zero(),
        vec2.zero(), vec2.zero(), vec2.zero()
    ];
};

const shapeQuad = (quad: Quad, shape: Rectangle): void => {
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

export const updateQuad = (quad: Quad, shape: Rectangle, position: Vector2D, orientation: number, view: View, camera: Camera): void => {
    // set quad to default vertex positions defined by given shape
    shapeQuad(quad, shape);
        
    for (const vertex of quad) {
        // update-to-parent
        vec2.rotate(vertex, -orientation); // rotate vetices around entity center (clock-wise)
        vec2.add(vertex, position); // move vertices to entity center

        // update-to-camera
        vec2.rotate(vertex, camera.orientation.get()); // rotate vetices around camera center (anti clock-wise)
        vec2.sub(vertex, camera.position.get()); // move vertices opposite to camera position

        // scale-to-view
        vec2.scale(vertex, view.scale); // scale sprites to view
        vec2.scale(vertex, DISTANCE_TO_PIXEL_RATIO); // scale game meters to pixels
    }
};
