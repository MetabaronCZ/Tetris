import { DebugActions } from 'engine/ui/components/debug/actions';

export interface DebugState {
    readonly ups: {
        readonly value: number;
        readonly avg: number;
    };
    readonly fps: {
        readonly value: number;
        readonly avg: number;
    };
}

export const initialState: DebugState = {
    ups: {
        value: 0,
        avg: 0
    },
    fps: {
        value: 0,
        avg: 0
    }
};

export const debugReducer = (state = initialState, action: DebugActions): DebugState => {
    switch (action.type) {
        case 'DEBUG':
            return { ...action.payload };
        default:
            return state;
    }
};
