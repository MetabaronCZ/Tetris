import { DEBUG_SPRITE } from 'data/config';

import Scene, { SceneConf } from 'engine/scene';
import { Vector2D } from 'engine/geometry/vector';
import Renderer, { SpriteRenderData, OutlineRenderData } from 'engine/graphics/renderer';

import GameAtlas from 'game/atlas';
import { ComponentID, CMap } from 'game/ecs';

export type GameSceneConf = SceneConf<ComponentID, CMap, GameAtlas>;

abstract class GameScene extends Scene<ComponentID, CMap, GameAtlas> {
    public render(renderer: Renderer): void {
        const { camera } = this;
        const points: Vector2D[] = [];
        const sprites: SpriteRenderData[] = [];
        const circles: OutlineRenderData[] = [];
        const rectangles: OutlineRenderData[] = [];

        renderer.start();

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
            renderer.renderSpriteData(sprites, camera);
        }

        if (circles.length) {
            renderer.renderCircleData(circles, camera);
        }

        if (rectangles.length) {
            renderer.renderRectangleData(rectangles, camera);
        }

        if (points.length) {
            renderer.renderPointData(points, camera);
        }
    }
}

export default GameScene;
