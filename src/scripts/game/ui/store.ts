import { GUIActionType, GUIActionBase } from 'engine/ui/actions';
import { InfoActionID } from 'game/ui/components/Info/actions';

type GameAPIActionType = InfoActionID;
type GameGUIActionType = GUIActionType<GameAPIActionType>;
export type GameGUIAction<T extends GameGUIActionType, U> = GUIActionBase<T, T, U>;
