import { EngineEntity } from 'engine/ecs/shared';

// rotate entites
export const rotate = (entity: EngineEntity): void => {
    if (!entity.orientation || !entity.angularVelocity || !entity.angularVelocity.isEnabled()) {
        return;
    }
    const ang = entity.angularVelocity.get();
    entity.orientation.rotateBy(ang);
};
