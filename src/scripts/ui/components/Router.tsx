import React from 'react';
import { connect } from 'react-redux';

import { GUIState } from 'ui/store';
import Info from 'ui/components/Info';
import Intro from 'ui/components/Intro';
import Summary from 'ui/components/Summary';

import { Phase } from 'game/scenes/tetris';

interface Props {
    readonly phase: Phase;
    readonly score: number;
}

const mapStateToProps = (state: GUIState): Props => ({
    phase: state.phase,
    score: state.info.score
});

const getContent = (phase: Phase, score: number): React.ReactNode => {
    switch (phase) {
        case 'INTRO':   return <Intro />;
        case 'GAME':    return <Info />;
        case 'SUMMARY': return <Summary score={score} />;
        default:        return null;
    }
};

const Router: React.SFC<Props> = ({ phase, score }) => (
    <div>
        <h1 className="Heading">Tetris</h1>
        {getContent(phase, score)}
    </div>
);

export default connect(mapStateToProps)(Router);
