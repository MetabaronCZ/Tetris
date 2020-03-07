import { v1 as uuid } from 'uuid';
import { ComponentMap } from 'engine/ecs/component';

export type Entity<T extends ComponentMap> = T & {
    readonly id: string;
};

export const createEntity = <T extends ComponentMap>(components: T): Entity<T> => {
    return {
        id: uuid(),
        ...components
    };
};
