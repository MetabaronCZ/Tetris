import { MAX_SPEED, ANIM_DURATION, INPUT_DELAY } from 'game/config';

import { OnSound } from 'game/scenes/tetris';
import { getScore } from 'game/scenes/tetris/score';
import TileAnimation from 'game/scenes/tetris/animation';
import {
    Piece, createPiece, checkPiece, placePiece, clearPiece
} from 'game/scenes/tetris/piece';

export type Phase = 'INIT' | 'RUNNING' | 'ANIMATING' | 'GAME_OVER';
export type TileValue = 0 | 1;
export type GridTiles = TileValue[][];
type UserMove = 'NONE' | 'LEFT' | 'RIGHT' | 'DOWN';

const getMaxStep = (speed: number): number => 10 * (MAX_SPEED + 1 - speed);

class Grid {
    private readonly width: number;
    private readonly height: number;
    private readonly onSound: OnSound;

    private phase: Phase = 'INIT';
    private paused = false;

    private userMove: UserMove = 'NONE';
    private shouldMove = false;
    private shouldRotate = false;

    private animation: TileAnimation | null = null;
    private nextPiece: Piece | null = null;
    private piece: Piece | null = null;
    private tiles: GridTiles = [];

    private lines = 0; // number of removed lines
    private score = 0; // player score

    private speed = 0; // game speed
    private stepCount = 0;
    private maxStep: number;

    constructor(width: number, height: number, onSound: OnSound) {
        this.width = width;
        this.height = height;
        this.onSound = onSound;
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
        const { phase, onSound } = this;

        if ('INIT' !== phase && 'GAME_OVER' !== phase) {
            return;
        }
        this.generateGrid();

        this.phase = ('INIT' === phase ? 'RUNNING' : 'INIT');
        this.userMove = 'NONE';
        this.shouldMove = false;
        this.shouldRotate = false;
        this.paused = false;
        this.piece = null;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.speed = 0;
        this.stepCount = 0;
        this.maxStep = getMaxStep(this.speed);

        onSound('START');
    }

    public pause(): void {
        const { phase, onSound } = this;

        if ('RUNNING' === phase || 'ANIMATING' === phase) {
            this.paused = !this.paused;
            onSound('PAUSE');
        }
    }

    public moveLeft(): void {
        if (this.canAct()) {
            this.shouldMove = true;
            this.userMove = 'LEFT';
        }
    }

    public moveRight(): void {
        if (this.canAct()) {
            this.shouldMove = true;
            this.userMove = 'RIGHT';
        }
    }

    public moveDown(): void {
        if (this.canAct()) {
            this.shouldMove = true;
            this.userMove = 'DOWN';
        }
    }

    public rotate(): void {
        if (this.canAct()) {
            this.shouldRotate = true;
        }
    }

    public step(): void {
        const { phase, piece, animation, maxStep, userMove, shouldMove, shouldRotate } = this;

        if (!shouldMove) {
            this.userMove = 'NONE';
        }
        this.shouldRotate = false;

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

                // user movement
                if (0 === this.stepCount % INPUT_DELAY) {
                    this.move(userMove);
                    this.shouldMove = false;
                }

                // user rotation
                if (shouldRotate) {
                    this.spin();
                }

                // gravity movement
                if (this.stepCount < maxStep) {
                    return;
                }
                this.stepCount = 0;
        
                if (piece) {
                    this.move('DOWN');
                    return;
                }
                this.addPiece();
        
                if (!this.piece) {
                    // force game over
                    this.phase = 'GAME_OVER';
                    this.onSound('GAME_OVER');
                    return;
                }
                return;
            }

            default:
                // do nothing
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
        const { tiles, onSound } = this;

        // get full lines
        const filled: number[] = [];

        tiles.forEach((row, i) => {
            if (!row.includes(0)) {
                filled.push(i);
            }
        });

        let lines = filled.length;

        if (lines > 0) {
            // run animation
            this.phase = 'ANIMATING';
            onSound(lines > 3 ? 'LINE4' : 'LINE');

            this.animation = new TileAnimation(ANIM_DURATION, filled, () => {
                this.phase = 'RUNNING';
                this.animation = null;

                // remove full lines
                this.tiles = tiles.filter((row, i) => !filled.includes(i));

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

    private move(userMove: UserMove): void {
        const { piece, onSound } = this;

        if (!piece || 'NONE' === userMove) {
            return;
        }
        const newPiece: Piece = { ...piece };

        switch (userMove) {
            case 'LEFT':
                newPiece.x--;
                
                if (this.replacePiece(newPiece)) {
                    onSound('MOVE');
                }
                return;

            case 'RIGHT':
                newPiece.x++;

                if (this.replacePiece(newPiece)) {
                    onSound('MOVE');
                }
                return;

            case 'DOWN':
                newPiece.y++;

                if (this.replacePiece(newPiece)) {
                    onSound('MOVE');
                    return;
                }
                this.piece = null;

                onSound('DROP');
                this.handleLines();
                return;

            default:
                // do nothing
        }
    }

    private spin(): void {
        const { piece, onSound } = this;

        if (!piece) {
            return;
        }
        const newPiece: Piece = { ...piece };
        newPiece.rot += 1;
        newPiece.rot %= piece.variants;

        if (this.replacePiece(newPiece)) {
            onSound('ROTATE');
        }
    }
}

export default Grid;
