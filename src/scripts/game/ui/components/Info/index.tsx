import React from 'react';
import { connect } from 'react-redux';

import { GameGUIState } from 'game/ui/store';

interface Props {
    readonly score: number;
    readonly removed: number;
    readonly speed: number;
}

const mapStateToProps = (state: GameGUIState): Props => ({
    score: state.game.info.score,
    removed: state.game.info.removed,
    speed: state.game.info.speed
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
