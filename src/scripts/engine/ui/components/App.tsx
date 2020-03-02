import React from 'react';
import { Provider } from 'react-redux';

import { DEBUG_COUNTER } from 'engine/data/config';

import { GUIStore } from 'engine/ui/store';
import Debug from 'engine/ui/components/Debug';

interface Props {
    readonly store: GUIStore<any, any>;
}

const App: React.SFC<Props> = ({ store, children }) => (
    <Provider store={store}>
        {DEBUG_COUNTER && <Debug />}
        {children}
    </Provider>
);

export default App;
