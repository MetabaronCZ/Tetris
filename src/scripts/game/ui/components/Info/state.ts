import { Phase } from 'game/scenes/tetris/grid';

export interface InfoState {
    readonly phase: Phase;
    readonly paused: boolean;
    readonly score: number;
    readonly lines: number;
    readonly speed: number;
}

export const getInfoState = (): InfoState => ({
    phase: 'INIT',
    paused: false,
    score: 0,
    lines: 0,
    speed: 0
});
