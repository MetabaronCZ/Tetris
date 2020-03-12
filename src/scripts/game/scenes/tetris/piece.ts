import { getRandomArrayItem } from 'engine/core/array';
import { pieces, PieceType, pieceTypes } from 'game/data/pieces';

export interface Piece {
    readonly type: PieceType;
    readonly variants: number;
    x: number;
    y: number;
    rot: number;
}

export const createPiece = (x: number, y: number, type?: PieceType): Piece => {
    const pieceType = type || getRandomArrayItem(pieceTypes);
    return {
        x,
        y,
        type: pieceType,
        rot: 0,
        variants: pieces[pieceType].length
    };
};
