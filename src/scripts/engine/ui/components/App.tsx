import React, { CSSProperties } from 'react';
import { Provider } from 'react-redux';

import { DEBUG_COUNTER, RENDER_WIDTH, RENDER_HEIGHT } from 'engine/data/config';

import { GUIStore } from 'engine/ui/store';
import Debug from 'engine/ui/components/Debug';

const contentStyles: CSSProperties = {
    maxWidth: RENDER_WIDTH + 'px',
    width: 100 * (RENDER_WIDTH / RENDER_HEIGHT) + 'vh',
    maxHeight: 100 * (RENDER_HEIGHT / RENDER_WIDTH) + 'vw'
};

interface Props {
    readonly store: GUIStore<any, any>;
}

const App: React.SFC<Props> = ({ store, children }) => (
    <Provider store={store}>
        <div className="Content">
            <div className="Content-inner" style={contentStyles}>
                {children}
            </div>
        </div>

        {DEBUG_COUNTER && <Debug />}
    </Provider>
);

export default App;
