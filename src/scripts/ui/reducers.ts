import { combineReducers, ReducersMapObject } from 'redux';

import { GUIState } from 'ui/store';
import { infoReducer } from 'ui/components/Info/reducers';
import { debugReducer } from 'ui/components/Debug/reducers';
import { phaseReducer } from 'ui/components/Phase/reducers';

const reducers = combineReducers<GUIState>({
    phase: phaseReducer,
    debug: debugReducer,
    info: infoReducer
} as ReducersMapObject<GUIState>);

export default reducers;
