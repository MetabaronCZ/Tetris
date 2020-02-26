import { loadImage } from 'core/image';

import { createUV } from 'engine/graphics/uv';
import { Texture } from 'engine/graphics/renderer';
import { SpriteDefinition, Sprite } from 'engine/graphics/sprite';

export interface SpriteAtlasDefinition<T extends string> {
    readonly texture: string;
    readonly width: number;
    readonly height: number;
    readonly sprites: {
        readonly [id in T]: SpriteDefinition;
    };
}

type Sprites<T extends string> = {
    readonly [id in T]: Sprite;
};

class SpriteAtlas<T extends string> {
    public readonly texture: string;
    public readonly sprites: Sprites<T>;

    constructor(def: SpriteAtlasDefinition<T>) {
        this.texture = def.texture;

        const tWidth = def.width;
        const tHeight = def.height;
        const sprites: Partial<Sprites<T>> = {};

        for (const id in def.sprites) {
            const spr = def.sprites[id];
            const x0 = spr.x / tWidth;
            const y0 = spr.y / tHeight;
            const x1 = (spr.x + spr.width) / tWidth;
            const y1 = (spr.y + spr.height) / tHeight;

            sprites[id] = {
                id,
                uv: createUV(x0, y0, x1, y1)
            };
        }
        this.sprites = sprites as Sprites<T>;
    }

    public load(id: number): Promise<Texture> {
        return new Promise<Texture>((resolve, reject) => {
            loadImage(this.texture)
                .then(image => resolve({ id, image }))
                .catch(reject);
        });
    }
}

export default SpriteAtlas;
