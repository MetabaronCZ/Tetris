type ShaderType = 'VERTEX' | 'FRAGMENT';

export const createShader = (gl: WebGL2RenderingContext, type: ShaderType, source: string): WebGLShader => {
    const shader = gl.createShader('VERTEX' === type ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);

    if (!shader) {
        throw new Error('Unable to create WebGL shader');
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const err = `Unable to compile ${type} shader: ${gl.getShaderInfoLog(shader)}`;
        gl.deleteShader(shader);
        throw new Error(err);
    }
    return shader;
};

export const createProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram => {
    const program = gl.createProgram();

    if (!program) {
        throw new Error('Unable to create WebGL program');
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const err = `Unable to link shader program: ${gl.getProgramInfoLog(program)}`;
        gl.deleteProgram(program);
        throw new Error(err);
    }
    return program;
};
