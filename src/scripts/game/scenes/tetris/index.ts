import Input from 'engine/input';
import { createCamera } from 'engine/ecs/camera';
import { setColorAlpha } from 'engine/graphics/color';

import pieces from 'game/data/pieces';
import atlasDefinition from 'game/data/atlas';
import { GRID_WIDTH, GRID_HEIGHT, SPRITE_SIZE } from 'game/config';

import { GameGUI } from 'game/ui';
import GameAtlas from 'game/atlas';
import Grid from 'game/scenes/tetris/grid';
import GameScene, { GameSceneConf } from 'game/scene';
import { Tile, createTile } from 'game/ecs/entites/tile-entity';

const OFF_LEFT = (SPRITE_SIZE * GRID_WIDTH - 1) / 2;
const OFF_TOP = (SPRITE_SIZE * GRID_HEIGHT - 1) / 2;

const createWorld = (): GameSceneConf => {
    const atlas = new GameAtlas(atlasDefinition);
    const tiles: Tile[] = [];

    // grid tiles
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const entity = createTile({
                type: 'TILE',
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

    // next piece tiles
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            const entity = createTile({
                type: 'PIECE',
                x: +((x + 2) * SPRITE_SIZE + OFF_LEFT),
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

    constructor() {
        super(createWorld());
        this.grid = new Grid(GRID_WIDTH, GRID_HEIGHT);
    }

    public handleInput(input: Input): void {
        const { grid } = this;

        if (input.isKeyDown('SPACE')) {
            grid.start();
        }

        if (input.isKeyDown('ESC')) {
            grid.pause();
        }

        if (input.isKeyDown('UP')) {
            grid.rotate();
        }

        if (input.isKeyPressed('LEFT')) {
            grid.moveLeft();
        } else if (input.isKeyPressed('RIGHT')) {
            grid.moveRight();
        } else if (input.isKeyPressed('DOWN')) {
            grid.moveDown();
        }
    }

    public update(): void {
        const { grid, textures, entities } = this;
        grid.step();

        const tiles = grid.getTiles();

        if (!tiles.length) {
            return;
        }
        const atlas = textures[0];
        const nextPiece = grid.getNextPiece();
        const animation = grid.getAnimation();
        const progress = animation ? animation.getProgress() : 1.0;

        for (const { type, coordinates, visual } of entities) {
            if (!coordinates || !visual || !type) {
                continue;
            }
            const cx = coordinates.x;
            const cy = coordinates.y;

            if ('TILE' === type.type) {
                // handle grid tile
                const value = tiles[cy][cx];
                visual.setSprite(value ? atlas.sprites.PIECE : atlas.sprites.TILE);
    
                if (animation && animation.rows.includes(cy)) {
                    setColorAlpha(visual.color, 1 - progress);
                } else {
                    setColorAlpha(visual.color, 1.0);
                }

            } else {
                // handle next piece tile
                let value = 0;

                if (nextPiece) {
                    const pTiles = pieces[nextPiece.type][0];
                    value = pTiles[cy][cx];
                }
                visual.setSprite(value ? atlas.sprites.PIECE : atlas.sprites.TILE);
            }
        }
    }

    public renderGUI(gui: GameGUI): void {
        const { grid } = this;
        const phase = grid.getPhase();
        const paused = grid.isPaused();
        const score = grid.getScore();
        const lines = grid.getLines();
        const speed = grid.getSpeed();
        gui.info.set(phase, paused, score, lines, speed);
    }
}

export default TetrisScene;
