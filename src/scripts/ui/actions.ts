import { Action } from 'redux';
import { DebugActionID, DebugActions } from 'ui/components/debug/actions';

type ActionType = DebugActionID;
export type GUIActions = DebugActions;

export interface GUIAction<T extends ActionType, U> extends Action<T> {
    readonly payload: U;
}
