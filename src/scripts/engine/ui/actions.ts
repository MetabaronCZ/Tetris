import { Action } from 'redux';

import { DebugActions, DebugActionID } from 'engine/ui/components/debug/actions';
import { InfoActions } from 'game/ui/components/Info/actions';

export type GUIActionType<T = ''> = DebugActionID | T;
export type GUIActions = DebugActions | InfoActions;

export interface GUIActionBase<S extends string, T extends GUIActionType<S>, U> extends Action<T> {
    readonly payload: U;
}

export interface GUIAction<T extends GUIActionType, U> extends Action<T> {
    readonly payload: U;
}
