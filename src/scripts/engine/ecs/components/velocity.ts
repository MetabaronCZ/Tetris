import { Component } from 'engine/ecs/component';
import { vec2, Vector2D } from 'engine/geometry/vector';

class Velocity extends Component {
    private readonly velocity = vec2.zero();

    constructor(x = 0, y = 0) {
        super();
        vec2.set(this.velocity, x, y);
    }

    public get(): Vector2D {
        return this.velocity;
    }

    public set(value: Vector2D): void {
        vec2.copy(this.velocity, value);
    }

    public accelerateBy(value: Vector2D): void {
        vec2.add(this.velocity, value);
    }
}

export default Velocity;
