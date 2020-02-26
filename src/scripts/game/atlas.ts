import SpriteAtlas from 'engine/graphics/atlas';

export type GameAtlasSpriteID = 'TILE' | 'PIECE';

class GameAtlas extends SpriteAtlas<GameAtlasSpriteID> {}
export default GameAtlas;
