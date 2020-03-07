import React from 'react';
import { combineReducers } from 'redux';

import { GUI, initGUI } from 'engine/ui';
import { initStore } from 'engine/ui/store';

import { GameAPIState, GameGUIStore, GameGUIActions } from 'game/ui/store';

import Router from 'game/ui/components/Router';
import { setInfo } from 'game/ui/components/Info/actions';
import { infoReducer, InfoState } from 'game/ui/components/Info/reducers';

interface GameAPI {
    readonly info: {
        readonly set: (info: InfoState) => void;
    };
}
export type GameGUI = GUI<GameAPI>;

const gameAPI = (store: GameGUIStore): GameAPI => ({
    info: {
        set: info => store.dispatch(setInfo(info))
    }
});

const gameReducers = combineReducers<GameAPIState, GameGUIActions>({
    info: infoReducer
});

export const initGameGUI = (root: HTMLDivElement): GameGUI => {
    const store: GameGUIStore = initStore(gameReducers);

    return initGUI({
        root,
        store,
        api: gameAPI,
        content: <Router />
    });
};
