import { GUIAction } from 'engine/ui/actions';
import { DebugState } from 'engine/ui/components/debug/reducers';

type SetDebug = GUIAction<'DEBUG', DebugState>;

export type DebugActions = SetDebug;
export type DebugActionID = 'DEBUG';

export const setDebug = (debug: DebugState): SetDebug => {
    return {
        type: 'DEBUG',
        payload: debug
    };
};
