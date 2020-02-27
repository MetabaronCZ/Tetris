import { GUIAction } from 'engine/ui/actions';
import { InfoState } from 'game/ui/components/info/reducers';

type SetInfo = GUIAction<'INFO', InfoState>;

export type InfoActions = SetInfo;
export type InfoActionID = 'INFO';

export const setInfo = (info: InfoState): SetInfo => {
    return {
        type: 'INFO',
        payload: info
    };
};
