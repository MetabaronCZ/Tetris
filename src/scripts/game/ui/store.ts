import { GUIActionType, GUIActionBase, GUIActions } from 'engine/ui/actions';
import { InfoActionID, InfoActions } from 'game/ui/components/Info/actions';

type GameAPIActionType = InfoActionID;
type GameGUIActionType = GUIActionType<GameAPIActionType>;
export type GameGUIAction<T extends GameGUIActionType, U> = GUIActionBase<T, T, U>;

type GameAPIActions = InfoActions;
export type GameGUIActions = GUIActions | GameAPIActions;
