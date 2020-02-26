import { Component } from 'engine/ecs/component';
import { Vector2D } from 'engine/geometry/vector';
import { pointInCircle, Circle } from 'engine/geometry/circle';
import { Outline, createOutline } from 'engine/graphics/outline';
import { pointInRectangle, Rectangle } from 'engine/geometry/rectangle';

class BoundingBox extends Component {
    private readonly shape: Rectangle | Circle;
    private readonly outline: Outline;
    private readonly hitbox: boolean; // responds to mouse events

    constructor(shape: Rectangle | Circle, hitbox = false) {
        super();
        this.shape = shape;
        this.hitbox = hitbox;

        if ('CIRCLE' === shape.type) {
            const { radius, position } = shape;
            this.outline = createOutline(2 * radius, 2 * radius, position[0], position[1], 0);
        } else {
            const { width, height, position, rotation } = shape;
            this.outline = createOutline(width, height, position[0], position[1], rotation);
        }
    }

    public hasHitbox(): boolean {
        return this.hitbox;
    }

    public getBox(): Rectangle | Circle {
        return this.shape;
    }

    public getOutline(): Outline {
        return this.outline;
    }

    public isPointInside(point: Vector2D): boolean {
        const { shape } = this;
    
        if ('CIRCLE' === shape.type) {
            return pointInCircle(shape as Circle, point);
        } else {
            return pointInRectangle(shape as Rectangle, point);
        }
    }
}

export default BoundingBox;
