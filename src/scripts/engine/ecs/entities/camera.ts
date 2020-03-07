import { Entity, createEntity } from 'engine/ecs/entity';
import { EngineComponentMap } from 'engine/ecs/component';

import Position from 'engine/ecs/components/position';
import Orientation from 'engine/ecs/components/orientation';

type CameraComponents = Pick<EngineComponentMap, 'position' | 'orientation'>;
export type Camera = Entity<CameraComponents>;

interface CameraConf {
    readonly x?: number;
    readonly y?: number;
    readonly ori?: number;
}

export const createCamera = (conf: CameraConf = {}): Camera => {
    return createEntity<CameraComponents>({
        position: new Position(conf.x, conf.y),
        orientation: new Orientation(conf.ori)
    });
};
