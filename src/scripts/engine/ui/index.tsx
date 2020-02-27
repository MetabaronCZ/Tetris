import React from 'react';
import { render } from 'react-dom';

import { initStore, GUIStore } from 'engine/ui/store';

import App from 'engine/ui/components/App';
import { setDebug } from 'engine/ui/components/Debug/actions';
import { DebugState } from 'engine/ui/components/debug/reducers';

export interface GUI {
    readonly debug: {
        readonly set: (debug: DebugState) => void;
    };
}

export const initGUI = <T extends {}>(root: HTMLDivElement, api: (store: GUIStore) => T): GUI & T => {
    const store = initStore();
    render(<App store={store} />, root);

    // return GUI API
    return {
        debug: {
            set: debug => store.dispatch(setDebug(debug))
        },
        ...api(store)
    };
};
