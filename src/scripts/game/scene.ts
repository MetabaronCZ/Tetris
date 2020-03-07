import { DEBUG_SPRITE } from 'engine/data/config';

import { View } from 'engine/view';
import { Scenes } from 'engine/game';
import Scene, { SceneConf } from 'engine/scene';
import { Vector2D } from 'engine/geometry/vector';
import Renderer, { SpriteRenderData, OutlineRenderData } from 'engine/graphics/renderer';

import { CMap } from 'game/ecs';
import { GameGUI } from 'game/ui';
import GameAtlas from 'game/atlas';

type GameSceneID = 'TETRIS';
export type GameSceneConf = SceneConf<CMap, GameAtlas>;
export type GameScenes = Scenes<GameSceneID, CMap, GameAtlas>;

abstract class GameScene extends Scene<GameSceneID, CMap, GameAtlas> {
    abstract renderGUI(gui: GameGUI): void;

    public render(renderer: Renderer, view: View, gui: GameGUI): void {
        const { camera } = this;
        const points: Vector2D[] = [];
        const sprites: SpriteRenderData[] = [];
        const circles: OutlineRenderData[] = [];
        const rectangles: OutlineRenderData[] = [];

        renderer.start(view);

        // render sprites / outlines / sprite centers
        for (const { position, orientation, boundingBox, visual } of this.entities) {
            const pos = position ? position.get() : null;
            const ori = orientation ? orientation.get() : null;

            if (pos && null !== ori && visual) {
                sprites.push([pos, ori, visual.vertices, visual.shape, visual.getSprite(), visual.color]);
            }

            if (DEBUG_SPRITE) {
                if (pos) {
                    points.push(pos);
                }

                if (pos && null !== ori && boundingBox) {
                    const bbox = boundingBox.getBox();
                    const outline = boundingBox.getOutline();

                    if ('CIRCLE' === bbox.type) {
                        circles.push([pos, ori, outline]);
                    } else {
                        rectangles.push([pos, ori, outline]);
                    }
                }
            }
        }

        if (sprites.length) {
            renderer.renderSpriteData(sprites, view, camera);
        }

        if (circles.length) {
            renderer.renderCircleData(circles, view, camera);
        }

        if (rectangles.length) {
            renderer.renderRectangleData(rectangles, view, camera);
        }

        if (points.length) {
            renderer.renderPointData(points, view, camera);
        }

        this.renderGUI(gui);
    }
}

export default GameScene;
