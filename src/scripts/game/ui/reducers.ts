import { combineReducers } from 'redux';

import { GUIState } from 'engine/ui/reducers';

import { GameGUIActions } from 'game/ui/actions';
import { InfoState } from 'game/ui/components/Info/state';
import { infoReducer } from 'game/ui/components/Info/reducers';

export interface GameAPIState {
    readonly info: InfoState;
}
export type GameGUIState = GUIState<GameAPIState>;

export const gameReducers = combineReducers<GameAPIState, GameGUIActions>({
    info: infoReducer
});
