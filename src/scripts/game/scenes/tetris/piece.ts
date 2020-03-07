import { getRandomArrayItem } from 'engine/core/array';

import pieces from 'game/data/pieces';
import { GridTiles } from 'game/scenes/tetris/grid';

const pieceTypes = ['O', 'I', 'S', 'Z', 'L', 'J', 'T'] as const;
export type PieceType = typeof pieceTypes[number];

export type PieceTiles = [
    [0 | 1, 0 | 1, 0 | 1, 0 | 1],
    [0 | 1, 0 | 1, 0 | 1, 0 | 1],
    [0 | 1, 0 | 1, 0 | 1, 0 | 1],
    [0 | 1, 0 | 1, 0 | 1, 0 | 1]
];

export interface Piece {
    readonly type: PieceType;
    readonly variants: number;
    x: number;
    y: number;
    rot: number;
}

export const createPiece = (x: number, y: number, type?: PieceType): Piece => {
    type = type || getRandomArrayItem(pieceTypes);
    return {
        x,
        y,
        type,
        rot: 0,
        variants: pieces[type].length
    };
};

export const checkPiece = (piece: Piece, grid: GridTiles): boolean => {
    const pTiles = pieces[piece.type][piece.rot];
    const width = grid[0].length;
    const height = grid.length;

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            const px = piece.x + x;
            const py = piece.y + y;

            // check only solid parts of the piece
            if (!pTiles[y][x]) {
                continue;
            }

            // check out of grid
            if (px < 0 || px > width - 1 || py < -1 || py > height - 1) {
                return false;
            }

            // check collision
            if (py >= 0 && grid[py][px]) {
                return false;
            }
        }
    }
    return true;
};

export const placePiece = (piece: Piece, grid: GridTiles): void => {
    const pTiles = pieces[piece.type][piece.rot];

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            const value = pTiles[y][x];
            const px = piece.x + x;
            const py = piece.y + y;

            if (!value) {
                continue;
            }

            if (py >= 0) {
                grid[py][px] = value;
            }
        }
    }
};

export const clearPiece = (piece: Piece, grid: GridTiles): void => {
    const pTiles = pieces[piece.type][piece.rot];

    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (piece.y + y >= 0 && pTiles[y][x]) {
                grid[piece.y + y][piece.x + x] = 0;
            }
        }
    }
};
