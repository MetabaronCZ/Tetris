import { Action } from 'redux';

import { InfoActions, InfoActionID } from 'ui/components/Info/actions';
import { DebugActions, DebugActionID } from 'ui/components/debug/actions';

type ActionType = DebugActionID | InfoActionID;
export type GUIActions = DebugActions | InfoActions;

export interface GUIAction<T extends ActionType, U> extends Action<T> {
    readonly payload: U;
}
