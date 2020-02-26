import { Component } from 'engine/ecs/component';

export type TileTypeID = 'TILE' | 'PIECE';

class TileType extends Component {
    public readonly type: TileTypeID;

    constructor(type: TileTypeID) {
        super();
        this.type = type;
    }
}

export default TileType;
