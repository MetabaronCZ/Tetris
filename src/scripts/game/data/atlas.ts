import { SpriteAtlasDefinition } from 'engine/graphics/atlas';
import { GameAtlasSpriteID } from 'game/atlas';

const atlas: SpriteAtlasDefinition<GameAtlasSpriteID> = {
    texture: '/atlas.png',
    width: 64,
    height: 32,
    sprites: {
        TILE: { x: 0, y: 0, width: 32, height: 32 },
        PIECE: { x: 32, y: 0, width: 32, height: 32 }
    }
};

export default atlas;
