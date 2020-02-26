import React from 'react';
import { connect } from 'react-redux';

import { GUIState } from 'ui/store';
import { InfoState } from 'ui/components/info/reducers';

type Props = InfoState;

const mapStateToProps = (state: GUIState): InfoState => ({
    score: state.info.score,
    removed: state.info.removed,
    speed: state.info.speed
});

const Info: React.SFC<Props> = ({ score, removed, speed }) => (
    <div className="Info">
        <strong>SCORE:</strong> {score}
        <br />
        <strong>REMOVED:</strong> {removed}
        <br />
        <strong>SPEED:</strong> {speed}
    </div>
);

export default connect(mapStateToProps)(Info);
