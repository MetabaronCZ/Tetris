import { Component } from 'engine/ecs/component';

class Coordinates extends Component {
    public readonly x: number;
    public readonly y: number;

    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }
}

export default Coordinates;
