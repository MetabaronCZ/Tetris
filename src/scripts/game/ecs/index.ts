import { Entity } from 'engine/ecs/entity';
import { EngineComponentMap } from 'engine/ecs/component';

import TileType from 'game/ecs/components/tile-type';
import Coordinates from 'game/ecs/components/coordinates';

export interface CMap extends EngineComponentMap {
    readonly type: TileType;
    readonly coordinates: Coordinates;
}

export type ComponentID = keyof CMap;
export type GameEntity = Entity<Partial<CMap>>;
