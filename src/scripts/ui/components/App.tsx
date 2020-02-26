import React from 'react';
import { Provider } from 'react-redux';

import { DEBUG_COUNTER } from 'data/config';

import { GUIStore } from 'ui/store';
import Debug from 'ui/components/Debug';

interface Props {
    readonly store: GUIStore;
}

const App: React.SFC<Props> = ({ store }) => (
    <Provider store={store}>
        {DEBUG_COUNTER && <Debug />}
    </Provider>
);

export default App;
