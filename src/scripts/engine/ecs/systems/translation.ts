import { EngineEntity } from 'engine/ecs/shared';

// move entities
export const translate = (entity: EngineEntity): void => {
    if (!entity.position || !entity.velocity || !entity.velocity.isEnabled()) {
        return;
    }
    const vel = entity.velocity.get();
    entity.position.moveBy(vel);
};
