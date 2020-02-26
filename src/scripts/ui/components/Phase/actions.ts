import { GUIAction } from 'ui/actions';
import { Phase } from 'game/scenes/tetris';

type SetPhase = GUIAction<'PHASE', Phase>;

export type PhaseActions = SetPhase;
export type PhaseActionID = 'PHASE';

export const setPhase = (phase: Phase): SetPhase => {
    return {
        type: 'PHASE',
        payload: phase
    };
};
