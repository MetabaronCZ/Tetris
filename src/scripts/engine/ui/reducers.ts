import { combineReducers, ReducersMapObject, Reducer } from 'redux';

import { GUIActions } from 'engine/ui/actions';
import { DebugState } from 'engine/ui/components/Debug/state';
import { debugReducer } from 'engine/ui/components/Debug/reducers';

interface EngineGUIState {
    readonly debug: DebugState;
}

export interface GUIState<T extends {} = {}> {
    readonly engine: EngineGUIState;
    readonly game: T;
}

const guiReducers = combineReducers<EngineGUIState, GUIActions<any>>({
    debug: debugReducer
});

export const getReducers = <T extends {}, U extends string>(gameReducers: Reducer<T, GUIActions<U>>): Reducer<GUIState<T>, GUIActions<U>> => {
    const reducers: ReducersMapObject<GUIState<T>, GUIActions<U>> = {
        engine: guiReducers,
        game: gameReducers
    };
    return combineReducers(reducers);
};
