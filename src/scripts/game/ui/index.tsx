import React from 'react';
import { combineReducers } from 'redux';

import { GUI, initGUI } from 'engine/ui';
import { initStore } from 'engine/ui/store';

import { GameAPIState, GameGUIStore, GameGUIActions } from 'game/ui/store';

import Router from 'game/ui/components/Router';
import { setInfo } from 'game/ui/components/Info/actions';
import { infoReducer } from 'game/ui/components/Info/reducers';

import { Phase } from 'game/scenes/tetris/grid';


interface GameAPI {
    readonly info: {
        readonly set: (phase: Phase, paused: boolean, score: number, lines: number, speed: number) => void;
    };
}

const gameGUI = (store: GameGUIStore): GameAPI => ({
    info: {
        set: (phase, paused, score, lines, speed) => {
            store.dispatch(setInfo({ phase, paused, score, lines, speed }));
        }
    }
});

const gameReducers = combineReducers<GameAPIState, GameGUIActions>({
    info: infoReducer
});

export type GameGUI = GUI<GameAPI>;

export const initGameGUI = (root: HTMLDivElement): GameGUI => {
    const store: GameGUIStore = initStore(gameReducers);

    return initGUI({
        root,
        store,
        api: gameGUI,
        content: <Router />
    });
};
