import Input from 'engine/input';
import { createCamera } from 'engine/ecs/camera';

import atlasDefinition from 'game/data/atlas';
import { GRID_WIDTH, GRID_HEIGHT } from 'game/config';

import GameAtlas from 'game/atlas';
import Grid from 'game/scenes/tetris/grid';
import GameScene, { GameSceneConf } from 'game/scene';
import { Tile, createTile } from 'game/ecs/entites/tile-entity';

const SPRITE_SIZE = 1;
const OFF_LEFT = GRID_WIDTH / 2;
const OFF_TOP = GRID_HEIGHT / 2;

type Phase = 'INTRO' | 'GAME' | 'SUMMARY';

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
        switch (this.phase) {
            case 'INTRO':
                if (input.isKeyDown('SPACE')) {
                    this.start();
                }
                break;

            case 'GAME':
                if (input.isKeyDown('LEFT')) {
                    this.grid.moveLeft();
                } else if (input.isKeyDown('RIGHT')) {
                    this.grid.moveRight();
                } else if (input.isKeyPressed('DOWN')) {
                    this.grid.moveDown();
                } else if (input.isKeyDown('UP')) {
                    this.grid.rotate();
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
                this.stop();
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

    private start(): void {
        this.phase = 'GAME';
        this.grid.start();
    }

    private stop(): void {
        this.phase = 'SUMMARY';
        console.log('GAME OVER');
    }
}

export default TetrisScene;
