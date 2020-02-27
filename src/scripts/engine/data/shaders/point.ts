export const pointVS = `#version 300 es
    in vec2 a_position;

    uniform float u_pointsize;

    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        gl_PointSize = u_pointsize;
    }
`;

export const pointFS = `#version 300 es
    precision mediump float;

    uniform vec4 u_pointcolor;

    out vec4 outColor;
 
    void main() {
        outColor = u_pointcolor;
    }
`;
