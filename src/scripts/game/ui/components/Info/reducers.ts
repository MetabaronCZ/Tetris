import { Phase } from 'game/scenes/tetris/grid';
import { InfoActions } from 'game/ui/components/info/actions';

export interface InfoState {
    readonly phase: Phase;
    readonly paused: boolean;
    readonly score: number;
    readonly lines: number;
    readonly speed: number;
}

export const initialState: InfoState = {
    phase: 'INIT',
    paused: false,
    score: 0,
    lines: 0,
    speed: 0
};

export const infoReducer = (state = initialState, action: InfoActions): InfoState => {
    switch (action.type) {
        case 'INFO':
            return { ...action.payload };
        default:
            return state;
    }
};
