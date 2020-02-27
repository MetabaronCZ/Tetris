import { Action } from 'redux';

import { DebugActions, DebugActionID } from 'engine/ui/components/debug/actions';
import { InfoActions, InfoActionID } from 'game/ui/components/Info/actions';

type ActionType = DebugActionID | InfoActionID;
export type GUIActions = DebugActions | InfoActions;

export interface GUIAction<T extends ActionType, U> extends Action<T> {
    readonly payload: U;
}
