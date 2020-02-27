import React from 'react';
import { Provider } from 'react-redux';

import { DEBUG_COUNTER } from 'engine/data/config';

import { GUIStore } from 'engine/ui/store';
import Debug from 'engine/ui/components/Debug';
import Router from 'game/ui/components/Router';

interface Props {
    readonly store: GUIStore;
}

const App: React.SFC<Props> = ({ store }) => (
    <Provider store={store}>
        {DEBUG_COUNTER && <Debug />}
        <Router />
    </Provider>
);

export default App;
