import React from 'react';
import { connect } from 'react-redux';

import { GameGUIState } from 'game/ui/store';

import Info from 'game/ui/components/Info';
import Intro from 'game/ui/components/Intro';
import Paused from 'game/ui/components/Paused';
import Summary from 'game/ui/components/Summary';

import { Phase } from 'game/scenes/tetris/grid';

interface Props {
    readonly phase: Phase;
    readonly paused: boolean;
    readonly score: number;
}

const mapStateToProps = (state: GameGUIState): Props => ({
    phase: state.game.info.phase,
    paused: state.game.info.paused,
    score: state.game.info.score
});

const getInfoText = (phase: Phase, paused: boolean, score: number): React.ReactNode => {
    if (paused) {
        return <Paused />;
    }
    switch (phase) {
        case 'INIT':
            return <Intro />;
        case 'GAME_OVER':
            return <Summary score={score} />;
        default:
            return null;
    }
};

const Router: React.SFC<Props> = ({ phase, paused, score }) => (
    <div className="Info">
        <h1 className="Info-heading">Tetris</h1>

        <div className="Info-content">
            <div className="Info-content-column">
                <Info />
            </div>

            <div className="Info-content-main">
                {getInfoText(phase, paused, score)}
            </div>

            <div className="Info-content-column" />
        </div>
    </div>
);

export default connect(mapStateToProps)(Router);
