import React from 'react';
import { render } from 'react-dom';

import { GUIStore } from 'engine/ui/store';

import App from 'engine/ui/components/App';
import { setDebug } from 'engine/ui/components/Debug/actions';
import { DebugState } from 'engine/ui/components/Debug/state';

interface GUIAPI {
    readonly debug: {
        readonly set: (debug: DebugState) => void;
    };
}

export type GUI<T extends {} = {}> = GUIAPI & {
    readonly [id in keyof T]: T[id];
};

interface GUIConf<T extends {}, U extends {}, V extends string> {
    readonly root: HTMLDivElement;
    readonly store: GUIStore<U, V>;
    readonly api: (store: GUIStore<U, V>) => T;
    readonly content: React.ReactNode;
}

export const initGUI = <T extends {}, U extends {}, V extends string>(conf: GUIConf<T, U, V>): GUI<T> => {
    const { root, store, api, content } = conf;

    render(
        <App store={store}>
            {content}
        </App>,
        root
    );

    // return GUI API
    return {
        debug: {
            set: debug => store.dispatch(setDebug(debug))
        },
        ...api(store)
    };
};
