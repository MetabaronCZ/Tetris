import { createShader, createProgram } from 'engine/graphics/gl';

const SIZE_OF_FLOAT = 4; // WebGL size of float number [in bytes]

type ProgramUniformType = 'INT' | 'FLOAT';

interface ProgramAttribute {
    readonly size: number;
}

interface ProgramUniform {
    readonly type: ProgramUniformType;
    readonly isVector: boolean;
    readonly isStatic: boolean; // uniform is set only at start
    readonly size: 1 | 2 | 3 | 4;
}

type ProgramAttributes<T extends string> = {
    readonly [name in T]: ProgramAttribute;
};

type ProgramUniforms<T extends string> = {
    readonly [name in T]: ProgramUniform;
};

interface Program<T extends string, U extends string | null> {
    readonly primitives: 'POINTS' | 'TRIANGLES';
    readonly vertexCount: number;
    readonly vertexShader: string;
    readonly fragmentShader: string;
    readonly attributes: ProgramAttributes<T>;
    readonly uniforms: U extends string ? ProgramUniforms<U> : null;
}

interface AttributeLocation {
    readonly id: number;
    readonly size: number;
    readonly offset: number;
}

type AttributeLocations<T extends string> = {
    [name in T]?: AttributeLocation;
};

interface UniformLocation {
    readonly location: WebGLUniformLocation | null;
}

type UniformLocations<T extends string> = {
    [name in T]?: UniformLocation;
};

export type RenderObject<T extends number | string> = {
    readonly [name in T]: Readonly<number[]>;
};

type RenderUniform = (gl: WebGL2RenderingContext, id: WebGLUniformLocation | null) => void;

type RenderUniforms<T extends string> = {
    readonly [name in T]: RenderUniform;
};

interface RenderData<T extends string, U extends string | null> {
    readonly objects: RenderObject<T>[];
    readonly uniforms: U extends string ? RenderUniforms<U> : null;
}

export type UseProgram<T extends string, U extends string | null = null> = (data: RenderData<T, U>) => void;

export const createRenderProgram = <T extends string, U extends string | null = null>(gl: WebGL2RenderingContext, conf: Program<T, U>): UseProgram<T, U> => {
    const vs = createShader(gl, 'VERTEX', conf.vertexShader);
    const fs = createShader(gl, 'FRAGMENT', conf.fragmentShader);
    const program = createProgram(gl, vs, fs);

    let primitives = gl.TRIANGLES;
    let offset = 0;

    if ('POINTS' === conf.primitives) {
        primitives = gl.POINTS;
    }

    // initialize vertex attributes
    const attributeLocations: AttributeLocations<T> = {};

    for (const name in conf.attributes) {
        const attr = conf.attributes[name];

        attributeLocations[name] = {
            id: gl.getAttribLocation(program, name),
            size: attr.size,
            offset
        };
        offset += attr.size * SIZE_OF_FLOAT;
    }
    const stride = offset;

    // initialize uniform values
    const uniformLocations: UniformLocations<any> = {};

    if (conf.uniforms) {
        for (const name in conf.uniforms) {
            uniformLocations[name] = {
                location: gl.getUniformLocation(program, name)
            };
        }
    }

    // one-time set uniform values
    const staticUniforms: Set<any> = new Set();

    // vertex data array
    const vertices: number[] = [];

    // program render function
    const render = (data: RenderData<T, U>): void => {
        if (!data.objects.length) {
            return;
        }
        gl.useProgram(program);

        // reset vertex array
        vertices.length = 0;

        // join data from all objects
        for (const obj of data.objects) {
            for (const attr in obj) {
                const value = obj[attr];

                if (value.length !== conf.attributes[attr].size) {
                    throw new Error(`Rendered program object attribute ${attr} has invalid value length: ` + value.length);
                }
                vertices.push(...obj[attr]);
            }
        }

        // create vertex buffer
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        // set attributes
        for (const name in attributeLocations) {
            const a = attributeLocations[name];

            if (a) {
                gl.enableVertexAttribArray(a.id);
                gl.vertexAttribPointer(a.id, a.size, gl.FLOAT, false, stride, a.offset);
            }
        }

        // set uniform values
        if (data.uniforms) {
            for (const name in data.uniforms) {
                if (staticUniforms.has(name)) {
                    continue;
                }
                staticUniforms.add(name);

                const u = uniformLocations[name];

                if (u) {
                    data.uniforms[name](gl, u.location);
                }
            }
        }

        // draw vertices
        gl.drawArrays(primitives, 0, conf.vertexCount * data.objects.length);

        gl.bindVertexArray(null);
    };

    return render;
};
