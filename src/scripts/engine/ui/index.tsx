import React from 'react';
import { render } from 'react-dom';

import { initStore } from 'engine/ui/store';

import App from 'engine/ui/components/App';
import { setDebug } from 'engine/ui/components/Debug/actions';
import { DebugState } from 'engine/ui/components/debug/reducers';

import { Phase } from 'game/scenes/tetris/grid';
import { setInfo } from 'game/ui/components/Info/actions';

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
