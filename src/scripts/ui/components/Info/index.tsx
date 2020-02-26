import React from 'react';
import { connect } from 'react-redux';

import { GUIState } from 'ui/store';

interface Props {
    readonly score: number;
    readonly removed: number;
    readonly speed: number;
}

const mapStateToProps = (state: GUIState): Props => ({
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
