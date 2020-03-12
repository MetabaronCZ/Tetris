import { Store, createStore, Reducer } from 'redux';

import { getReducers, GUIState } from 'engine/ui/reducers';
import { PayloadAction, GUIActionType, GUIActions } from 'engine/ui/actions';

export type GUIStore<T extends {}, U extends string> = Store<GUIState<T>, PayloadAction<GUIActionType<U>, any>>;

export const initStore = <T extends {}, U extends string>(gReducers: Reducer<T, GUIActions<U>>): GUIStore<T, U> => {
    const reducers = getReducers(gReducers);
    return createStore(reducers);
};
