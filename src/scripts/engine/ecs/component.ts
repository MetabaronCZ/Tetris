import Visual from 'engine/ecs/components/visual';
import Velocity from 'engine/ecs/components/velocity';
import Position from 'engine/ecs/components/position';
import Orientation from 'engine/ecs/components/orientation';
import BoundingBox from 'engine/ecs/components/bounding-box';
import AngularVelocity from 'engine/ecs/components/angular-velocity';

export type ComponentMap<T extends string = never> = {
    readonly [id in T]: Component;
}

export interface EngineComponentMap extends ComponentMap {
    readonly position: Position;
    readonly orientation: Orientation;
    readonly velocity: Velocity;
    readonly angularVelocity: AngularVelocity;
    readonly boundingBox: BoundingBox;
    readonly visual: Visual;
}

export abstract class Component {
    private enabled = true;

    public isEnabled(): boolean {
        return this.enabled;
    }

    public toggle(enable: boolean): void {
        this.enabled = enable;
    }
}
