import { Store, createStore } from 'redux';

import reducers from 'ui/reducers';
import { GUIActions } from 'ui/actions';
import { InfoState } from 'ui/components/info/reducers';
import { DebugState } from 'ui/components/debug/reducers';

import { Phase } from 'game/scenes/tetris';

export interface GUIState {
    readonly debug: DebugState;
    readonly info: InfoState;
    phase: Phase;
}

export type GUIStore = Store<GUIState, GUIActions>;

export const initStore = (): GUIStore => {
    return createStore(reducers);
};
