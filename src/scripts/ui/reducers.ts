import { combineReducers, ReducersMapObject } from 'redux';

import { GUIState } from 'ui/store';
import { infoReducer } from 'ui/components/Info/reducers';
import { debugReducer } from 'ui/components/Debug/reducers';

const reducers = combineReducers<GUIState>({
    debug: debugReducer,
    info: infoReducer
} as ReducersMapObject<GUIState>);

export default reducers;
