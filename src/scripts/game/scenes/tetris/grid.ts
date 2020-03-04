import { MAX_SPEED, ANIM_DURATION } from 'game/config';

import { getScore } from 'game/scenes/tetris/score';
import TileAnimation from 'game/scenes/tetris/animation';
import {
    Piece, createPiece, checkPiece, placePiece, clearPiece
} from 'game/scenes/tetris/piece';

export type Phase = 'INIT' | 'RUNNING' | 'ANIMATING' | 'GAME_OVER';
export type TileValue = 0 | 1;
export type GridTiles = TileValue[][];

const getMaxStep = (speed: number): number => 10 * (MAX_SPEED + 1 - speed);

class Grid {
    private readonly width: number;
    private readonly height: number;

    private phase: Phase = 'INIT';
    private paused = false;

    private animation: TileAnimation | null = null;
    private nextPiece: Piece | null = null;
    private piece: Piece | null = null;
    private tiles: GridTiles = [];

    private lines = 0; // number of removed lines
    private score = 0; // player score

    private speed = 0; // game speed
    private stepCount = 0;
    private maxStep: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.maxStep = getMaxStep(this.speed);
    }

    public isPaused(): boolean {
        return this.paused;
    }

    public getPhase(): Phase {
        return this.phase;
    }

    public getScore(): number {
        return this.score;
    }

    public getLines(): number {
        return this.lines;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public getTiles(): GridTiles {
        return this.tiles;
    }

    public getNextPiece(): Piece | null {
        return this.nextPiece;
    }

    public getAnimation(): TileAnimation | null {
        return this.animation;
    }

    public start(): void {
        const { phase } = this;

        if ('INIT' !== phase && 'GAME_OVER' !== phase) {
            return;
        }
        this.generateGrid();

        this.phase = ('INIT' === phase ? 'RUNNING' : 'INIT');
        this.paused = false;
        this.piece = null;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.speed = 0;
        this.stepCount = 0;
        this.maxStep = getMaxStep(this.speed);
    }

    public pause(): void {
        const { phase } = this;

        if ('RUNNING' === phase || 'ANIMATING' === phase) {
            this.paused = !this.paused;
        }
    }

    public moveLeft(): void {
        const { piece } = this;

        if (!this.canAct() || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.x--;

        this.replacePiece(newPiece);
    }

    public moveRight(): void {
        const { piece } = this;

        if (!this.canAct() || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.x++;

        this.replacePiece(newPiece);
    }

    public moveDown(): void {
        const { piece } = this;

        if (!this.canAct() || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.y++;

        if (this.replacePiece(newPiece)) {
            return;
        }
        this.piece = null;
        this.handleLines();
    }

    public rotate(): void {
        const { piece } = this;

        if (!this.canAct() || !piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.rot += 1;
        newPiece.rot %= piece.variants;

        this.replacePiece(newPiece);
    }

    public step(): void {
        const { phase, piece, animation, maxStep } = this;

        if (this.paused) {
            return;
        }

        switch (phase) {
            case 'ANIMATING': {
                if (!animation) {
                    throw new Error('No animation found');
                }
                animation.step();
                return;
            }

            case 'RUNNING': {
                this.stepCount++;

                if (this.stepCount < maxStep) {
                    return;
                }
                this.stepCount = 0;
        
                if (piece) {
                    this.moveDown();
                    return;
                }
                this.addPiece();
        
                if (!this.piece) {
                    // force game over
                    this.phase = 'GAME_OVER';
                    return;
                }
                return;
            }

            default:
                // do nothing
                return;
        }
    }

    private canAct(): boolean {
        const { phase, paused } = this;
        return 'RUNNING' === phase && !paused;
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
        this.nextPiece = this.nextPiece || createPiece();

        const { tiles, nextPiece } = this;

        if (!checkPiece(nextPiece, tiles)) {
            return;
        }
        placePiece(nextPiece, tiles);

        this.piece = nextPiece;
        this.nextPiece = createPiece();
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

    private handleLines(): void {
        // get full lines
        const filled: number[] = [];

        this.tiles.forEach((row, i) => {
            if (!row.includes(0)) {
                filled.push(i);
            }
        });

        let lines = filled.length;

        if (lines > 0) {
            // run animation
            this.phase = 'ANIMATING';

            this.animation = new TileAnimation(ANIM_DURATION, filled, () => {
                this.phase = 'RUNNING';
                this.animation = null;

                // remove full lines
                this.tiles = this.tiles.filter((row, i) => !filled.includes(i));

                // update score / info
                const score = getScore(this.speed, lines);
                this.lines += lines;
                this.score += score;
    
                // recalc game speed
                this.speed = Math.floor(this.lines / 10);
                this.speed = Math.min(this.speed, MAX_SPEED);
                this.stepCount = 0;
                this.maxStep = getMaxStep(this.speed);
        
                // put back removed lines
                while (lines) {
                    const row = this.createRow();
                    this.tiles.unshift(row);
                    lines--;
                }
            });
        }
    }
}

export default Grid;
