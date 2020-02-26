export const spriteVS = `#version 300 es
    in vec2 a_position;
    in vec2 a_texcoord;
    in vec4 a_color;

    out vec4 v_color;
    out vec2 v_texcoord;

    void main() {
        v_color = a_color;
        v_texcoord = a_texcoord;

        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

export const spriteFS = `#version 300 es
    precision mediump float;

    in vec4 v_color;
    in vec2 v_texcoord;

    uniform sampler2D u_texture;

    out vec4 outColor;
 
    void main() {
        outColor = texture(u_texture, v_texcoord) * v_color;
    }
`;
