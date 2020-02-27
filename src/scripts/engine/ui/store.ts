import { Store, createStore } from 'redux';

import reducers from 'engine/ui/reducers';
import { GUIActions } from 'engine/ui/actions';
import { DebugState } from 'engine/ui/components/debug/reducers';

import { InfoState } from 'game/ui/components/info/reducers';

export interface GUIState {
    readonly debug: DebugState;
    readonly info: InfoState;
}

export type GUIStore = Store<GUIState, GUIActions>;

export const initStore = (): GUIStore => {
    return createStore(reducers);
};
