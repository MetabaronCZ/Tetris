import { GameGUIAction } from 'game/ui/store';
import { InfoState } from 'game/ui/components/info/reducers';

type SetInfo = GameGUIAction<'INFO', InfoState>;

export type InfoActions = SetInfo;
export type InfoActionID = 'INFO';

export const setInfo = (info: InfoState): SetInfo => {
    return {
        type: 'INFO',
        payload: info
    };
};
