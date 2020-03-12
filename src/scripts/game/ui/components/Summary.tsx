import React from 'react';

interface Props {
    readonly score: number;
}

const Summary: React.SFC<Props> = ({ score }) => (
    <div className="Info-text">
        <strong>- GAME OVER -</strong>
        <br />
        SCORE: {score}
        <br />
        <br />
        Press <strong>SPACE</strong> to continue...
    </div>
);


export default Summary;
