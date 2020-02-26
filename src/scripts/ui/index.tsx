import React from 'react';
import { render } from 'react-dom';

import { initStore } from 'ui/store';

import App from 'ui/components/App';
import { setDebug } from 'ui/components/debug/actions';
import { DebugState } from 'ui/components/debug/reducers';

export interface GUI {
    readonly debug: {
        readonly set: (debug: DebugState) => void;
    };
}

export const initGUI = (root: HTMLDivElement): GUI => {
    const store = initStore();
    render(<App store={store} />, root);

    // return GUI API
    return {
        debug: {
            set: (debug: DebugState) => store.dispatch(setDebug(debug))
        }
    };
};
