import React from 'react';
import { render } from 'react-dom';

import { initStore } from 'ui/store';

import App from 'ui/components/App';
import { setInfo } from 'ui/components/Info/actions';
import { setDebug } from 'ui/components/Debug/actions';
import { setPhase } from 'ui/components/Phase/actions';
import { DebugState } from 'ui/components/debug/reducers';

import { Phase } from 'game/scenes/tetris';

export interface GUI {
    readonly phase: {
        readonly set: (phase: Phase) => void;
    };
    readonly debug: {
        readonly set: (debug: DebugState) => void;
    };
    readonly info: {
        readonly set: (score: number, removed: number, speed: number) => void;
    };
}

export const initGUI = (root: HTMLDivElement): GUI => {
    const store = initStore();
    render(<App store={store} />, root);

    // return GUI API
    return {
        phase: {
            set: phase => store.dispatch(setPhase(phase))
        },
        debug: {
            set: debug => store.dispatch(setDebug(debug))
        },
        info: {
            set: (score, removed, speed) => store.dispatch(setInfo({ score, removed, speed }))
        }
    };
};
