import { pointVS, pointFS } from 'engine/data/shaders/point';
import { createRenderProgram, UseProgram, RenderObject } from 'engine/graphics/program';

type PointAttributes = 'a_position';
type PointUniforms = 'u_pointsize' | 'u_pointcolor';

export type PointRender = UseProgram<PointAttributes, PointUniforms>;
export type PointRenderObject = RenderObject<PointAttributes>;

export const renderPoints = (gl: WebGL2RenderingContext): PointRender => {
    return createRenderProgram<PointAttributes, PointUniforms>(gl, {
        primitives: 'POINTS',
        vertexCount: 1,
        vertexShader: pointVS,
        fragmentShader: pointFS,
        attributes: {
            a_position: { size: 2 }
        },
        uniforms: {
            u_pointsize: { type: 'FLOAT', size: 1, isVector: false, isStatic: true },
            u_pointcolor: { type: 'FLOAT', size: 3, isVector: true, isStatic: true }
        }
    });
};
