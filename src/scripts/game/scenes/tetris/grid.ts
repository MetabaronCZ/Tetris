import { MAX_SPEED } from 'game/config';
import { getScore } from 'game/scenes/tetris/score';
import {
    Piece, createPiece, checkPiece, placePiece, clearPiece
} from 'game/scenes/tetris/piece';

export type TileValue = 0 | 1;
export type GridTiles = TileValue[][];

const getMaxStep = (speed: number): number => 10 * (MAX_SPEED + 1 - speed);

class Grid {
    private readonly width: number;
    private readonly height: number;

    private piece: Piece | null = null;
    private tiles: GridTiles = [];

    private running = false;
    private paused = false;
    private gameOver = false;

    private removed = 0; // number of removed rows
    private score = 0; // player score

    private speed = 0; // game speed
    private stepCount = 0;
    private maxStep: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.maxStep = getMaxStep(this.speed);
    }

    public isGameOver(): boolean {
        return this.gameOver;
    }

    public getScore(): number {
        return this.score;
    }

    public getRemoved(): number {
        return this.removed;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public getTiles(): GridTiles {
        return this.tiles;
    }

    public start(): void {
        if (this.running) {
            throw new Error('Game already running');
        }
        this.generateGrid();

        this.gameOver = false;
        this.running = true;
        this.paused = false;
        this.piece = null;
        this.score = 0;
        this.removed = 0;
        this.stepCount = 0;
    }

    public pause(): void {
        this.paused = !this.paused;
    }

    public moveLeft(): void {
        const { running, paused, piece } = this;

        if (!running || !piece || paused) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.x--;

        this.replacePiece(newPiece);
    }

    public moveRight(): void {
        const { running, paused, piece } = this;

        if (!running || !piece || paused) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.x++;

        this.replacePiece(newPiece);
    }

    public moveDown(): void {
        const { running, paused, piece } = this;

        if (!running || !piece || paused) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.y++;

        if (this.replacePiece(newPiece)) {
            return;
        }
        this.piece = null;
        this.handleRows();
    }

    public rotate(): void {
        const { running, paused, piece } = this;

        if (!running || !piece || paused) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.rot += 1;
        newPiece.rot %= piece.variants;

        this.replacePiece(newPiece);
    }

    public step(): void {
        if (!this.running || this.paused) {
            return;
        }
        this.stepCount++;

        if (this.stepCount < this.maxStep) {
            return;
        }
        this.stepCount = 0;

        if (this.piece) {
            this.moveDown();
            return;
        }
        this.addPiece();

        if (!this.piece) {
            // force game over
            this.gameOver = true;
            this.running = false;
            return;
        }
    }

    private generateGrid(): void {
        this.tiles.length = 0;

        for (let y = 0; y < this.height; y++) {
            const row = this.createRow();
            this.tiles.push(row);
        }
    }

    private createRow(): TileValue[] {
        return Array(this.width).fill(0);
    }

    private addPiece(): void {
        this.piece = null;

        const { tiles } = this;
        const piece = createPiece();

        if (!checkPiece(piece, tiles)) {
            return;
        }
        placePiece(piece, tiles);
        this.piece = piece;
    }

    private replacePiece(newPiece: Piece): boolean {
        const { piece, tiles } = this;

        // clear actual piece (prevent actual vs new piece collision)
        if (piece) {
            clearPiece(piece, tiles);
        }

        if (checkPiece(newPiece, tiles)) {
            // place new piece
            placePiece(newPiece, tiles);
            this.piece = newPiece;
            return true;

        } else {
            // return actual piece (if exists)
            if (piece) {
                placePiece(piece, tiles);
            }
            return false;
        }
    }

    private handleRows(): void {
        // remove filled rows
        this.tiles = this.tiles.filter(row => row.includes(0));

        // update game info
        let removed = this.height - this.tiles.length;

        if (removed > 0) {
            const score = getScore(this.speed, removed);

            this.removed += removed;
            this.score += score;

            this.speed = Math.floor(this.removed / 10);
            this.speed = Math.min(this.speed, MAX_SPEED);
            this.stepCount = 0;
            this.maxStep = getMaxStep(this.speed);
    
            // put back removed rows
            while (removed) {
                const row = this.createRow();
                this.tiles.unshift(row);
                removed--;
            }
        }
    }
}

export default Grid;
