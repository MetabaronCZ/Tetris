import { GUIStore } from 'engine/ui/store';
import { GameAPIState } from 'game/ui/reducers';
import { GameAPIActionType } from 'game/ui/actions';

export type GameGUIStore = GUIStore<GameAPIState, GameAPIActionType>;
