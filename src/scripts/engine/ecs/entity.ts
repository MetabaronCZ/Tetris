import { v1 as uuid } from 'uuid';
import { ComponentMap } from 'engine/ecs/component';

export type EntityBase = {
    readonly id: string;
};

export type EntityComponents<T extends string, U extends ComponentMap<T>> = {
    readonly [id in T]: U[id];
};

export type Entity<T extends string, U extends ComponentMap<T>> = EntityBase & EntityComponents<T, U>;

export const createEntity = <T extends string, U extends ComponentMap<T>>(components: EntityComponents<T, U>): Entity<T, U> => {
    return {
        id: uuid(),
        ...components
    };
};
