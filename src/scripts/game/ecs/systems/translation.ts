import { GameEntity } from 'game/ecs';

// move entities
export const translate = (entity: GameEntity): void => {
    if (!entity.position || !entity.velocity || !entity.velocity.isEnabled()) {
        return;
    }
    const vel = entity.velocity.get();
    entity.position.moveBy(vel);
};
