interface ScoreTable {
    readonly [lines: number]: number;
}

const scoreTable: ScoreTable = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200
};

export const getScore = (speed: number, lines: number): number => {
    const base = scoreTable[lines] || null;

    if (null === base) {
        throw new Error(`Invalid line count: + ${lines}`);
    }
    return base * (speed + 1);
};
