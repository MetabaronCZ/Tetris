import { Component } from 'engine/ecs/component';
import { vec2, Vector2D } from 'engine/geometry/vector';

class Position extends Component {
    private readonly position = vec2.zero();

    constructor(x = 0, y = 0) {
        super();
        vec2.set(this.position, x, y);
    }

    public get(): Vector2D {
        return this.position;
    }

    public set(value: Vector2D): void {
        vec2.copy(this.position, value);
    }

    public moveBy(value: Vector2D): void {
        vec2.add(this.position, value);
    }
}

export default Position;
