import { Component } from 'engine/ecs/component';

class Orientation extends Component {
    private orientation = 0;

    constructor(orientation = 0) {
        super();
        this.set(orientation);
    }

    public get(): number {
        return this.orientation;
    }

    public set(value: number): void {
        this.orientation = value;
    }

    public rotateBy(value: number): void {
        this.orientation += value;
    }
}

export default Orientation;
