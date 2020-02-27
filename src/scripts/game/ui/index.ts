import { GUI } from 'engine/ui';

import { GUIStore } from 'engine/ui/store';
import { Phase } from 'game/scenes/tetris/grid';
import { setInfo } from 'game/ui/components/Info/actions';

interface GameAPI {
    readonly info: {
        readonly set: (phase: Phase, paused: boolean, score: number, removed: number, speed: number) => void;
    };
}

export type GameGUI = GUI & GameAPI;

export const gameGUI = (store: GUIStore): GameAPI => ({
    info: {
        set: (phase, paused, score, removed, speed) => {
            store.dispatch(setInfo({ phase, paused, score, removed, speed }));
        }
    }
});
