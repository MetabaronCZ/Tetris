import { circleVS, circleFS } from 'data/shaders/circle';
import { createRenderProgram, UseProgram, RenderObject } from 'engine/graphics/program';

type CircleAttributes = 'a_position' | 'a_texcoord' | 'a_ratio';
type CircleUniforms = 'u_outlinecolor';

export type CircleRender = UseProgram<CircleAttributes, CircleUniforms>;
export type CircleRenderObject = RenderObject<CircleAttributes>;

export const renderCircles = (gl: WebGL2RenderingContext): CircleRender => {
    return createRenderProgram<CircleAttributes, CircleUniforms>(gl, {
        primitives: 'TRIANGLES',
        vertexCount: 6,
        vertexShader: circleVS,
        fragmentShader: circleFS,
        attributes: {
            a_position: { size: 2 },
            a_texcoord: { size: 2 },
            a_ratio: { size: 2 }
        },
        uniforms: {
            u_outlinecolor: { type: 'FLOAT', size: 4, isVector: true, isStatic: true }
        }
    });
};
