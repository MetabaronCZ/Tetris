import { PhaseActions } from 'ui/components/Phase/actions';
import { Phase } from 'game/scenes/tetris';

export const initialState: Phase = 'INTRO';

export const phaseReducer = (state = initialState, action: PhaseActions): Phase => {
    switch (action.type) {
        case 'PHASE':
            return action.payload;
        default:
            return state;
    }
};
