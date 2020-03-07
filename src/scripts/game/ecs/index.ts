import { Entity } from 'engine/ecs/entity';

import Visual from 'game/ecs/components/visual';
import Velocity from 'game/ecs/components/velocity';
import Position from 'game/ecs/components/position';
import TileType from 'game/ecs/components/tile-type';
import Coordinates from 'game/ecs/components/coordinates';
import Orientation from 'game/ecs/components/orientation';
import BoundingBox from 'game/ecs/components/bounding-box';
import AngularVelocity from 'game/ecs/components/angular-velocity';

export interface CMap {
    readonly type: TileType;
    readonly position: Position;
    readonly orientation: Orientation;
    readonly coordinates: Coordinates;
    readonly velocity: Velocity;
    readonly angularVelocity: AngularVelocity;
    readonly boundingBox: BoundingBox;
    readonly visual: Visual;
}

export type ComponentID = keyof CMap;
export type GameEntity = Entity<Partial<CMap>>;
