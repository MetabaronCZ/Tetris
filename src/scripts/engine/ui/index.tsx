import React from 'react';
import { render } from 'react-dom';

import { initStore, GUIStore } from 'engine/ui/store';

import App from 'engine/ui/components/App';
import { setDebug } from 'engine/ui/components/Debug/actions';
import { DebugState } from 'engine/ui/components/debug/reducers';

interface GUIAPI {
    readonly debug: {
        readonly set: (debug: DebugState) => void;
    };
}

export type GUI<T extends {} = {}> = GUIAPI & {
    readonly [id in keyof T]: T[id];
}

export const initGUI = <T extends {}>(root: HTMLDivElement, api: (store: GUIStore) => T, content: React.ReactNode): GUI<T> => {
    const store = initStore();
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
