import { combineReducers, ReducersMapObject } from 'redux';

import { GUIState } from 'ui/store';
import { debugReducer } from 'ui/components/debug/reducers';

const reducers = combineReducers<GUIState>({
    debug: debugReducer
} as ReducersMapObject<GUIState>);

export default reducers;
