import { InfoActions } from 'ui/components/info/actions';

export interface InfoState {
    readonly score: number;
    readonly removed: number;
    readonly speed: number;
}

export const initialState: InfoState = {
    score: 0,
    removed: 0,
    speed: 1
};

export const infoReducer = (state = initialState, action: InfoActions): InfoState => {
    switch (action.type) {
        case 'INFO':
            return { ...action.payload };
        default:
            return state;
    }
};
