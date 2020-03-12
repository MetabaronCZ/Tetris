import React from 'react';
import { connect } from 'react-redux';

import { GameGUIState } from 'game/ui/reducers';

interface Props {
    readonly score: number;
    readonly lines: number;
    readonly speed: number;
}

const mapStateToProps = (state: GameGUIState): Props => ({
    score: state.game.info.score,
    lines: state.game.info.lines,
    speed: state.game.info.speed
});

const Info: React.SFC<Props> = ({ score, lines, speed }) => (
    <>
        <strong>SCORE:</strong> {score}
        <br />
        <strong>LINES:</strong> {lines}
        <br />
        <strong>SPEED:</strong> {speed}
    </>
);

export default connect(mapStateToProps)(Info);
