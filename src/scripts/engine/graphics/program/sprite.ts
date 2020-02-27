import { spriteVS, spriteFS } from 'engine/data/shaders/sprite';
import { createRenderProgram, UseProgram, RenderObject } from 'engine/graphics/program';

type SpriteAttributes = 'a_position' | 'a_texcoord' | 'a_color';

export type SpriteRender = UseProgram<SpriteAttributes>;
export type SpriteRenderObject = RenderObject<SpriteAttributes>;

export const renderSprites = (gl: WebGL2RenderingContext): SpriteRender => {
    return createRenderProgram<SpriteAttributes>(gl, {
        primitives: 'TRIANGLES',
        vertexCount: 6,
        vertexShader: spriteVS,
        fragmentShader: spriteFS,
        attributes: {
            a_position: { size: 2 },
            a_texcoord: { size: 2 },
            a_color: { size: 4 }
        },
        uniforms: null
    });
};
