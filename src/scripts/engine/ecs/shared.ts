import { Entity } from 'engine/ecs/entity';
import { ComponentMap } from 'engine/ecs/component';

import Visual from 'engine/ecs/components/visual';
import Velocity from 'engine/ecs/components/velocity';
import Position from 'engine/ecs/components/position';
import Orientation from 'engine/ecs/components/orientation';
import BoundingBox from 'engine/ecs/components/bounding-box';
import AngularVelocity from 'engine/ecs/components/angular-velocity';

export interface EngineComponentMap extends ComponentMap {
    readonly position: Position;
    readonly orientation: Orientation;
    readonly velocity: Velocity;
    readonly angularVelocity: AngularVelocity;
    readonly boundingBox: BoundingBox;
    readonly visual: Visual;
}

export type EngineEntity = Entity<EngineComponentMap>;
