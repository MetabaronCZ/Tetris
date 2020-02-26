import { Action } from 'redux';

import { InfoActions, InfoActionID } from 'ui/components/Info/actions';
import { DebugActions, DebugActionID } from 'ui/components/debug/actions';
import { PhaseActions, PhaseActionID } from 'ui/components/Phase/actions';

type ActionType = PhaseActionID | DebugActionID | InfoActionID;
export type GUIActions = PhaseActions | DebugActions | InfoActions;

export interface GUIAction<T extends ActionType, U> extends Action<T> {
    readonly payload: U;
}
