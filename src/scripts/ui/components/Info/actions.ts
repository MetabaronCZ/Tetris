import { GUIAction } from 'ui/actions';
import { InfoState } from 'ui/components/info/reducers';

type SetInfo = GUIAction<'INFO', InfoState>;

export type InfoActions = SetInfo;
export type InfoActionID = 'INFO';

export const setInfo = (info: InfoState): SetInfo => {
    return {
        type: 'INFO',
        payload: info
    };
};
