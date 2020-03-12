import { InfoActions } from 'game/ui/components/Info/actions';
import { InfoState, getInfoState } from 'game/ui/components/Info/state';

export const infoReducer = (state = getInfoState(), action: InfoActions): InfoState => {
    switch (action.type) {
        case 'INFO':
            return { ...action.payload };
        default:
            return state;
    }
};
