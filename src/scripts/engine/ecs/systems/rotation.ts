import { Entity } from 'engine/ecs/entity';
import { EngineComponentMap } from 'engine/ecs/component';

// rotate entites
export const rotate = (entity: Entity<EngineComponentMap>): void => {
    if (!entity.orientation || !entity.angularVelocity || !entity.angularVelocity.isEnabled()) {
        return;
    }
    const ang = entity.angularVelocity.get();
    entity.orientation.rotateBy(ang);
};
