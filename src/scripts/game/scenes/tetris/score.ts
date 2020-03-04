export const getScore = (speed: number, lines: number): number => {
    let base = 0;

    switch (lines) {
        case 1: base = 40; break;
        case 2: base = 100; break;
        case 3: base = 300; break;
        case 4: base = 1200; break;
        default:
            throw new Error('Invalid lines count: ' + lines);
    }
    return base * (speed + 1);
};
