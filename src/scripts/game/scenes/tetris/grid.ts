import { Piece, createPiece, checkPiece, placePiece, clearPiece } from 'game/scenes/tetris/piece';

export type TileValue = 0 | 1;
export type GridTiles = TileValue[][]

class Grid {
    private readonly width: number;
    private readonly height: number;

    private piece: Piece | null = null;
    private tiles: GridTiles = [];

    private removed = 0; // number of removed rows
    private score = 0; // player score
    private running = false;
    private gameOver = false;

    private stepCount = 0;
    private maxStep = 100;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
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
        this.piece = null;
        this.score = 0;
        this.removed = 0;
        this.stepCount = 0;
    }

    public moveLeft(): void {
        const { running, piece, tiles } = this;

        if (!running || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.x--;

        if (checkPiece(newPiece, tiles)) {
            this.replacePiece(newPiece);
        }
    }

    public moveRight(): void {
        const { running, piece, tiles } = this;

        if (!running || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.x++;

        if (checkPiece(newPiece, tiles)) {
            this.replacePiece(newPiece);
        }
    }

    public moveDown(): void {
        const { running, piece, tiles } = this;

        if (!running || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.y++;

        if (checkPiece(newPiece, tiles)) {
            this.replacePiece(newPiece);
            return;
        }
        this.piece = null;
        this.handleRows();
    }

    public rotate(): void {
        const { running, piece, tiles } = this;

        if (!running || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.rot += 1;
        newPiece.rot /= piece.variants;

        if (checkPiece(newPiece, tiles)) {
            this.replacePiece(newPiece);
        }
    }

    public step(): void {
        if (!this.running) {
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

    private handleRows(): void {
        // remove filled rows
        this.tiles = this.tiles.filter(row => row.includes(0));

        // update score
        let removed = this.height - this.tiles.length;
        this.removed += removed;
        this.score += 40 * removed;

        // put back removed rows
        while (removed) {
            const row = this.createRow();
            this.tiles.unshift(row);
            removed--;
        }
    }

    private replacePiece(newPiece: Piece): void {
        const { piece, tiles } = this;

        if (piece) {
            clearPiece(piece, tiles);
            placePiece(newPiece, tiles);
            this.piece = newPiece;
        }
    }
}

export default Grid;
