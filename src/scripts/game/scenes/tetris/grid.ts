import { MAX_SPEED, ANIM_DURATION, INPUT_DELAY } from 'game/config';

import { pieces } from 'game/data/pieces';
import { SoundID } from 'game/data/sounds';

import { getScore } from 'game/scenes/tetris/score';
import TileAnimation from 'game/scenes/tetris/animation';
import { Piece, createPiece } from 'game/scenes/tetris/piece';

export type Phase = 'INIT' | 'RUNNING' | 'ANIMATING' | 'GAME_OVER';
export type TileValue = 0 | 1;
export type GridTiles = TileValue[][];

export interface GridInfo {
    readonly phase: Phase;
    readonly paused: boolean;
    readonly score: number;
    readonly lines: number;
    readonly speed: number;
}
type OnSound = (id: SoundID) => void;
type UserMove = 'NONE' | 'LEFT' | 'RIGHT' | 'DOWN';

class Grid {
    private readonly width: number;
    private readonly height: number;
    private readonly onSound: OnSound;

    private phase: Phase = 'INIT';
    private paused = false;

    private userMove: UserMove = 'NONE';
    private movePressed = 0;
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
        this.maxStep = 0;
    }

    public getInfo(): GridInfo {
        return {
            phase: this.phase,
            paused: this.paused,
            score: this.score,
            lines: this.lines,
            speed: this.speed
        };
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
        this.phase = ('INIT' === phase ? 'RUNNING' : 'INIT');
        this.userMove = 'NONE';
        this.movePressed = 0;
        this.shouldMove = false;
        this.shouldRotate = false;
        this.paused = false;
        this.piece = null;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.speed = 0;
        this.stepCount = 0;

        this.generateGrid();
        this.setMaxStep();

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
        this.initMove('LEFT');
    }

    public moveRight(): void {
        this.initMove('RIGHT');
    }

    public moveDown(): void {
        this.initMove('DOWN');
    }

    public rotate(): void {
        if (this.canAct()) {
            this.shouldRotate = true;
        }
    }

    public step(): void {
        const { animation, userMove, shouldRotate } = this;

        if (!this.shouldMove) {
            this.userMove = 'NONE';
        }
        this.shouldRotate = false;

        if (this.paused) {
            return;
        }

        switch (this.phase) {
            case 'ANIMATING': {
                if (!animation) {
                    throw new Error('No animation found');
                }
                animation.step();
                break;
            }

            case 'RUNNING': {
                this.stepCount++;
                this.movePressed++;

                // user movement
                if (0 === this.movePressed % INPUT_DELAY) {
                    this.move(userMove);
                    this.shouldMove = false;
                }

                // user rotation
                if (shouldRotate) {
                    this.spin();
                }

                // gravity movement
                if (this.stepCount < this.maxStep) {
                    return;
                }
                this.stepCount = 0;

                if (this.piece) {
                    this.move('DOWN');
                    return;
                }
                this.addPiece();

                if (!this.piece) {
                    // force game over
                    this.phase = 'GAME_OVER';
                    this.onSound('GAME_OVER');
                }
                break;
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
        // initial piece coords
        const x = (this.width / 2) - 2;
        const y = -1;

        // create next piece
        this.piece = null;
        this.nextPiece = this.nextPiece || createPiece(x, y);

        const { nextPiece } = this;

        if (!this.checkPiece(nextPiece)) {
            return;
        }
        this.placePiece(nextPiece);

        this.piece = nextPiece;
        this.nextPiece = createPiece(x, y);
    }

    private replacePiece(newPiece: Piece): boolean {
        const { piece } = this;

        // clear actual piece (prevent actual vs new piece collision)
        if (piece) {
            this.clearPiece(piece);
        }

        if (this.checkPiece(newPiece)) {
            // place new piece
            this.placePiece(newPiece);
            this.piece = newPiece;
            return true;
        }

        // return actual piece (if exists)
        if (piece) {
            this.placePiece(piece);
        }
        return false;
    }

    private checkPiece(piece: Piece): boolean {
        const { tiles } = this;

        const pTiles = pieces[piece.type][piece.rot];
        const width = tiles[0].length;
        const height = tiles.length;

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
                if (py >= 0 && tiles[py][px]) {
                    return false;
                }
            }
        }
        return true;
    }

    private placePiece(piece: Piece): void {
        const pTiles = pieces[piece.type][piece.rot];
        const { tiles } = this;

        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const value = pTiles[y][x];
                const px = piece.x + x;
                const py = piece.y + y;

                if (!value) {
                    continue;
                }

                if (py >= 0) {
                    tiles[py][px] = value;
                }
            }
        }
    }

    private clearPiece(piece: Piece): void {
        const pTiles = pieces[piece.type][piece.rot];
        const { tiles } = this;

        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (piece.y + y >= 0 && pTiles[y][x]) {
                    tiles[piece.y + y][piece.x + x] = 0;
                }
            }
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
                this.setMaxStep();

                // put back removed lines
                while (lines) {
                    const row = this.createRow();
                    this.tiles.unshift(row);
                    lines--;
                }
            });
        }
    }

    private setMaxStep(): void {
        this.maxStep = 10 * (MAX_SPEED + 1 - this.speed);
    }

    private initMove(dir: UserMove): void {
        if (this.canAct() && 'NONE' !== dir) {
            if (dir !== this.userMove) {
                this.movePressed = 0;
            }
            this.shouldMove = true;
            this.userMove = dir;
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
                break;

            case 'RIGHT':
                newPiece.x++;

                if (this.replacePiece(newPiece)) {
                    onSound('MOVE');
                }
                break;

            case 'DOWN':
                newPiece.y++;

                if (this.replacePiece(newPiece)) {
                    onSound('MOVE');
                    return;
                }
                this.piece = null;

                onSound('DROP');
                this.handleLines();
                break;

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
