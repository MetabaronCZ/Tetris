import { combineReducers, ReducersMapObject } from 'redux';

import { GUIState } from 'engine/ui/store';
import { debugReducer } from 'engine/ui/components/Debug/reducers';

import { infoReducer } from 'game/ui/components/Info/reducers';

const reducers = combineReducers<GUIState>({
    debug: debugReducer,
    info: infoReducer
} as ReducersMapObject<GUIState>);

export default reducers;
