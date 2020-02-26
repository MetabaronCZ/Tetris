import { Sprite } from 'engine/graphics/sprite';
import { createColor } from 'engine/graphics/color';
import { Entity, createEntity } from 'engine/ecs/entity';
import { createRectangle } from 'engine/geometry/rectangle';

import { CMap } from 'game/ecs';
import Visual from 'game/ecs/components/visual';
import Position from 'game/ecs/components/position';
import Orientation from 'game/ecs/components/orientation';
import Coordinates from 'game/ecs/components/coordinates';
import TileType, { TileTypeID } from 'game/ecs/components/tile-type';

type TileComponentID = 'position' | 'orientation' | 'coordinates' | 'type' | 'visual';
export type Tile = Entity<TileComponentID, CMap>;

interface TileConf {
    readonly type: TileTypeID;
    readonly x: number;
    readonly y: number;
    readonly cx: number; // X coordinate
    readonly cy: number; // Y coordinate
    readonly size: number;
    readonly sprite: Sprite;
}

export const createTile = (conf: TileConf): Tile => {
    const color = createColor(255, 255, 255);

    const entity = createEntity<TileComponentID, CMap>({
        type: new TileType(conf.type),
        coordinates: new Coordinates(conf.cx, conf.cy),
        position: new Position(conf.x, conf.y),
        orientation: new Orientation(),
        visual: new Visual(conf.sprite, createRectangle(conf.size, conf.size), color)
    });

    return entity as Tile;
};
