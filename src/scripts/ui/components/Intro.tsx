import React from 'react';

const Intro: React.SFC = () => (
    <div className="Info">
        Press <strong>←</strong>, <strong>→</strong>, <strong>↓</strong> to move piece
        <br />
        Press <strong>↑</strong> to rotate piece
        <br />
        Press <strong>ESCAPE</strong> to pause game
        <br />
        <br />
        Press <strong>SPACE</strong> to start new game
    </div>
);

export default Intro;
