import React from 'react';

import { GUI, initGUI } from 'engine/ui';
import { GUIStore } from 'engine/ui/store';

import Router from 'game/ui/components/Router';
import { setInfo } from 'game/ui/components/Info/actions';

import { Phase } from 'game/scenes/tetris/grid';

interface GameAPI {
    readonly info: {
        readonly set: (phase: Phase, paused: boolean, score: number, removed: number, speed: number) => void;
    };
}

const gameGUI = (store: GUIStore): GameAPI => ({
    info: {
        set: (phase, paused, score, removed, speed) => {
            store.dispatch(setInfo({ phase, paused, score, removed, speed }));
        }
    }
});

export type GameGUI = GUI<GameAPI>;

export const initGameGUI = (root: HTMLDivElement): GameGUI => {
    return initGUI(root, gameGUI, <Router />);
};
