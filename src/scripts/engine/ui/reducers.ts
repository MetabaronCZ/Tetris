import { combineReducers, ReducersMapObject, Reducer } from 'redux';

import { GUIActions } from 'engine/ui/actions';
import { GUIState, GUIAPI } from 'engine/ui/store';
import { debugReducer } from 'engine/ui/components/Debug/reducers';

const guiReducers = combineReducers<GUIAPI, GUIActions<any>>({
    debug: debugReducer
});

export const getReducers = <T extends {}, U extends string>(gameReducers: Reducer<T, GUIActions<U>>): Reducer<GUIState<T>, GUIActions<U>> => {
    const reducers: ReducersMapObject<GUIState<T>, GUIActions<U>> = {
        engine: guiReducers,
        game: gameReducers
    };
    return combineReducers(reducers);
};
