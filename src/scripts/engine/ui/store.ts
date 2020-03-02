import { Store, createStore, Reducer } from 'redux';

import { getReducers } from 'engine/ui/reducers';
import { DebugState } from 'engine/ui/components/debug/reducers';
import { PayloadAction, GUIActionType, GUIActions } from 'engine/ui/actions';

export interface GUIAPI {
    readonly debug: DebugState;
}

export interface GUIState<T extends {} = {}> {
    readonly engine: GUIAPI;
    readonly game: T;
}

export type GUIStore<T extends {}, U extends string> = Store<GUIState<T>, PayloadAction<GUIActionType<U>, any>>;

export const initStore = <T extends {}, U extends string>(gReducers: Reducer<T, GUIActions<U>>): GUIStore<T, U> => {
    const reducers = getReducers(gReducers);
    return createStore(reducers);
};
