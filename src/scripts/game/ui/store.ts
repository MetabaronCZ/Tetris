import { GUIState, GUIStore } from 'engine/ui/store';
import { GUIActionType, PayloadAction } from 'engine/ui/actions';

import { InfoState } from 'game/ui/components/Info/reducers';
import { InfoActionID } from 'game/ui/components/Info/actions';

type GameAPIActionType = InfoActionID;
type GameGUIActionType = GUIActionType<GameAPIActionType>;
export type GameGUIAction<T extends GameGUIActionType, U> = PayloadAction<T, U>;
export type GameGUIActions = GameGUIAction<any, any>;

export interface GameAPIState {
    readonly info: InfoState;
}
export type GameGUIState = GUIState<GameAPIState>;
export type GameGUIStore = GUIStore<GameAPIState, GameAPIActionType>;
