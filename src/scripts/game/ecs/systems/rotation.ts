import { GameEntity } from 'game/ecs';

// rotate entites
export const rotate = (entity: GameEntity): void => {
    if (!entity.orientation || !entity.angularVelocity || !entity.angularVelocity.isEnabled()) {
        return;
    }
    const ang = entity.angularVelocity.get();
    entity.orientation.rotateBy(ang);
};
