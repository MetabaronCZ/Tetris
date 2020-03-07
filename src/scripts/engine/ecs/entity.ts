import { v1 as uuid } from 'uuid';
import { ComponentMap } from 'engine/ecs/component';

export type EntityBase = {
    readonly id: string;
};

export type Entity<T extends string, U extends ComponentMap<T>> = EntityBase & Pick<U, T>;

export const createEntity = <T extends string, U extends ComponentMap<T>>(components: Pick<U, T>): Entity<T, U> => {
    return {
        id: uuid(),
        ...components
    };
};
