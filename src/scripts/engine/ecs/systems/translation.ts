import { Entity } from 'engine/ecs/entity';
import { EngineComponentMap } from 'engine/ecs/component';

// move entities
export const translate = (entity: Entity<EngineComponentMap>): void => {
    if (!entity.position || !entity.velocity || !entity.velocity.isEnabled()) {
        return;
    }
    const vel = entity.velocity.get();
    entity.position.moveBy(vel);
};
