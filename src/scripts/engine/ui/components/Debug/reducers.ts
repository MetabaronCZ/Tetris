import { DebugActions } from 'engine/ui/components/Debug/actions';
import { DebugState, getDebugState } from 'engine/ui/components/Debug/state';

export const debugReducer = (state = getDebugState(), action: DebugActions): DebugState => {
    switch (action.type) {
        case 'DEBUG':
            return { ...action.payload };
        default:
            return state;
    }
};
