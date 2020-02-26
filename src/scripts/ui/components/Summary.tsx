import React from 'react';

interface Props {
    readonly score: number;
}

const Summary: React.SFC<Props> = ({ score }) => (
    <div className="Info">
        <strong>- GAME OVER -</strong>
        <br />
        SCORE: {score}
        <br />
        <br />
        Press <strong>SPACE</strong> to start new game
    </div>
);


export default Summary;
