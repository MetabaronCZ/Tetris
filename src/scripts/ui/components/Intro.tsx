import React from 'react';

const Intro: React.SFC = () => (
    <div className="Info">
        Press <strong>←</strong> to move piece left
        <br />
        Press <strong>→</strong> to move piece right
        <br />
        Press <strong>↓</strong> to move piece down
        <br />
        Press <strong>↑</strong> to rotate piece
        <br />
        <br />
        Press <strong>SPACE</strong> to start new game
    </div>
);

export default Intro;
