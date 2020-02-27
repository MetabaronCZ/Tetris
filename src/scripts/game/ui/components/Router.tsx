import React from 'react';
import { connect } from 'react-redux';

import { GUIState } from 'engine/ui/store';

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

const mapStateToProps = (state: GUIState): Props => ({
    phase: state.info.phase,
    paused: state.info.paused,
    score: state.info.score
});

const getContent = (phase: Phase, paused: boolean, score: number): React.ReactNode => {
    if (paused) {
        return <Paused />;
    }
    switch (phase) {
        case 'INIT':
            return <Intro />;
        case 'RUNNING':
        case 'ANIMATING':
            return <Info />;
        case 'GAME_OVER':
            return <Summary score={score} />;
        default:
            return null;
    }
};

const Router: React.SFC<Props> = ({ phase, paused, score }) => (
    <div>
        <h1 className="Heading">Tetris</h1>
        {getContent(phase, paused, score)}
    </div>
);

export default connect(mapStateToProps)(Router);
