import React from 'react';

import { GUI, initGUI } from 'engine/ui';
import { initStore } from 'engine/ui/store';

import { GameGUIStore } from 'game/ui/store';

import Router from 'game/ui/components/Router';
import { gameReducers } from 'game/ui/reducers';
import { setInfo } from 'game/ui/components/Info/actions';
import { InfoState } from 'game/ui/components/Info/state';

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

export const initGameGUI = (root: HTMLDivElement): GameGUI => {
    const store: GameGUIStore = initStore(gameReducers);

    return initGUI({
        root,
        store,
        api: gameAPI,
        content: <Router />
    });
};
