import { GUIActionType, PayloadAction } from 'engine/ui/actions';
import { InfoActionID } from 'game/ui/components/info/actions';

export type GameAPIActionType = InfoActionID;

type GameGUIActionType = GUIActionType<GameAPIActionType>;
export type GameGUIAction<T extends GameGUIActionType, U> = PayloadAction<T, U>;

export type GameGUIActions = GameGUIAction<any, any>;
