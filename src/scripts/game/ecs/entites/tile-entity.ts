import { Sprite } from 'engine/graphics/sprite';
import { createColor } from 'engine/graphics/color';
import { Entity, createEntity } from 'engine/ecs/entity';
import { createRectangle } from 'engine/geometry/rectangle';

import Visual from 'engine/ecs/components/visual';
import Position from 'engine/ecs/components/position';
import Orientation from 'engine/ecs/components/orientation';

import { CMap } from 'game/ecs';
import Coordinates from 'game/ecs/components/coordinates';
import TileType, { TileTypeID } from 'game/ecs/components/tile-type';

type TileComponents = Pick<CMap, 'position' | 'orientation' | 'coordinates' | 'type' | 'visual'>;
export type Tile = Entity<TileComponents>;

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
    const shape = createRectangle(conf.size, conf.size);

    return createEntity<TileComponents>({
        type: new TileType(conf.type),
        coordinates: new Coordinates(conf.cx, conf.cy),
        position: new Position(conf.x, conf.y),
        orientation: new Orientation(),
        visual: new Visual(conf.sprite, shape, color)
    });
};
