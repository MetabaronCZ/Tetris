import { Store, createStore } from 'redux';

import reducers from 'ui/reducers';
import { GUIActions } from 'ui/actions';
import { DebugState } from 'ui/components/debug/reducers';

export interface GUIState {
    readonly debug: DebugState;
}

export type GUIStore = Store<GUIState, GUIActions>;

export const initStore = (): GUIStore => {
    return createStore(reducers);
};
