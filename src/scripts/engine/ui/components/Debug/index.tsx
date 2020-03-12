import React from 'react';
import { connect } from 'react-redux';

import { GUIState } from 'engine/ui/reducers';
import { DebugState } from 'engine/ui/components/Debug/state';

type Props = DebugState;

const mapStateToProps = (state: GUIState): DebugState => state.engine.debug;

const Debug: React.SFC<Props> = ({ ups, fps }) => (
    <div className="Debug">
        <div className="Debug-row">
            <div className="Debug-column">FPS:</div>
            <div className="Debug-column u-alignRight">
                {fps.value}
            </div>

            <div className="Debug-column">avg:</div>
            <div className="Debug-column u-alignRight">
                {fps.avg.toFixed(3)}
            </div>
        </div>

        <div className="Debug-row">
            <div className="Debug-column">UPS:</div>
            <div className="Debug-column u-alignRight">
                {ups.value}
            </div>

            <div className="Debug-column">avg:</div>
            <div className="Debug-column u-alignRight">
                {ups.avg.toFixed(3)}
            </div>

            <div className="Debug-column" />
            <div className="Debug-column" />
        </div>
    </div>
);

export default connect(mapStateToProps)(Debug);
