import { Action } from 'redux';
import { DebugActionID } from 'engine/ui/components/debug/actions';

export type GUIActionType<T = ''> = DebugActionID | T;

export interface PayloadAction<T extends string, U> extends Action<T> {
    readonly payload: U;
}
export type GUIAction<T extends GUIActionType, U> = PayloadAction<T, U>;
export type GUIActions<T extends string> = PayloadAction<GUIActionType<T>, any>;
