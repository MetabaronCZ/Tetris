import { Component } from 'engine/ecs/component';

class AngularVelocity extends Component {
    private velocity = 0;

    constructor(velocity = 0) {
        super();
        this.set(velocity);
    }

    public get(): number {
        return this.velocity;
    }

    public set(value: number): void {
        this.velocity = value;
    }

    public accelerateBy(value: number): void {
        this.velocity += value;
    }
}

export default AngularVelocity;
