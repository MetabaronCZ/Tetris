import { GUI } from 'ui';

import Input from 'engine/input';
import { createCamera } from 'engine/ecs/camera';

import atlasDefinition from 'game/data/atlas';
import { GRID_WIDTH, GRID_HEIGHT, SPRITE_SIZE } from 'game/config';

import GameAtlas from 'game/atlas';
import Grid from 'game/scenes/tetris/grid';
import GameScene, { GameSceneConf } from 'game/scene';
import { Tile, createTile } from 'game/ecs/entites/tile-entity';

const OFF_LEFT = (SPRITE_SIZE * GRID_WIDTH - 1) / 2;
const OFF_TOP = (SPRITE_SIZE * GRID_HEIGHT - 1) / 2;

export type Phase = 'INTRO' | 'GAME' | 'PAUSED' | 'SUMMARY';

const createWorld = (): GameSceneConf => {
    const atlas = new GameAtlas(atlasDefinition);

    const tiles: Tile[] = [];

    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const entity = createTile({
                x: +(x * SPRITE_SIZE - OFF_LEFT),
                y: -(y * SPRITE_SIZE - OFF_TOP),
                cx: x,
                cy: y,
                size: SPRITE_SIZE,
                sprite: atlas.sprites.TILE
            });

            tiles.push(entity);
        }
    }
    return {
        camera: createCamera(),
        entities: tiles,
        textures: [atlas]
    };
};

class TetrisScene extends GameScene {
    private readonly grid: Grid;
    private phase: Phase = 'INTRO';

    constructor() {
        super(createWorld());
        this.grid = new Grid(GRID_WIDTH, GRID_HEIGHT);
    }

    public handleInput(input: Input): void {
        const { phase, grid } = this;

        switch (phase) {
            case 'INTRO':
                if (input.isKeyDown('SPACE')) {
                    this.phase = 'GAME';
                    grid.start();
                }
                break;

            case 'GAME':
                if (input.isKeyDown('ESC')) {
                    this.phase = 'PAUSED';
                    grid.pause();
                } else if (input.isKeyDown('LEFT')) {
                    grid.moveLeft();
                } else if (input.isKeyDown('RIGHT')) {
                    grid.moveRight();
                } else if (input.isKeyPressed('DOWN')) {
                    grid.moveDown();
                } else if (input.isKeyDown('UP')) {
                    grid.rotate();
                }
                break;

            case 'PAUSED':
                if (input.isKeyDown('ESC')) {
                    this.phase = 'GAME';
                    grid.pause();
                }
                break;

            default:
                // do nothing
        }
    }

    public update(): void {
        const { phase, grid, textures, entities } = this;

        if ('GAME' === phase) {
            if (grid.isGameOver()) {
                this.phase = 'SUMMARY';
                return;
            }
            grid.step();

            const tiles = grid.getTiles();
            const atlas = textures[0];

            for (const { coordinates, visual } of entities) {
                if (!coordinates || !visual) {
                    continue;
                }
                const cx = coordinates.x;
                const cy = coordinates.y;

                const value = tiles[cy][cx];
                visual.setSprite(value ? atlas.sprites.PIECE : atlas.sprites.TILE);
            }
        }
    }

    public renderGUI(gui: GUI): void {
        const { phase, grid } = this;
        const score = grid.getScore();
        const removed = grid.getRemoved();
        const speed = grid.getSpeed();

        gui.phase.set(phase);
        gui.info.set(score, removed, speed);
    }
}

export default TetrisScene;
