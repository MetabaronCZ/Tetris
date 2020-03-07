import { Entity, createEntity } from 'engine/ecs/entity';

import { CMap } from 'game/ecs';
import Position from 'game/ecs/components/position';
import Orientation from 'game/ecs/components/orientation';

type CameraComponents = Pick<CMap, 'position' | 'orientation'>;
export type Camera = Entity<CameraComponents>;

interface CameraConf {
    readonly x?: number;
    readonly y?: number;
    readonly ori?: number;
}

export const createCamera = (conf: CameraConf = {}): Camera => {
    const entity = createEntity<CameraComponents>({
        position: new Position(conf.x, conf.y),
        orientation: new Orientation(conf.ori)
    });
    return entity as Camera;
};
