import React from 'react';
import { render } from 'react-dom';

import { initStore } from 'ui/store';

import App from 'ui/components/App';
import { setInfo } from 'ui/components/Info/actions';
import { setDebug } from 'ui/components/Debug/actions';
import { DebugState } from 'ui/components/debug/reducers';

import { Phase } from 'game/scenes/tetris/grid';

export interface GUI {
    readonly debug: {
        readonly set: (debug: DebugState) => void;
    };
    readonly info: {
        readonly set: (phase: Phase, paused: boolean, score: number, removed: number, speed: number) => void;
    };
}

export const initGUI = (root: HTMLDivElement): GUI => {
    const store = initStore();
    render(<App store={store} />, root);

    // return GUI API
    return {
        debug: {
            set: debug => store.dispatch(setDebug(debug))
        },
        info: {
            set: (phase, paused, score, removed, speed) => {
                store.dispatch(setInfo({ phase, paused, score, removed, speed }));
            }
        }
    };
};
