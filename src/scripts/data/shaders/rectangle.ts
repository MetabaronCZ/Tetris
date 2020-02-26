export const rectangleVS = `#version 300 es
    in vec2 a_position;
    in vec2 a_texcoord;
    in vec2 a_ratio;

    out vec2 v_ratio;
    out vec2 v_texcoord;

    void main() {
        v_ratio = a_ratio;
        v_texcoord = a_texcoord;

        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

export const rectangleFS = `#version 300 es
    precision mediump float;

    in vec2 v_ratio;
    in vec2 v_texcoord;

    uniform vec4 u_outlinecolor;

    out vec4 outColor;
 
    void main() {
        if (
            v_texcoord.x < v_ratio.x ||
            v_texcoord.x > 1.0 - v_ratio.x ||
            v_texcoord.y < v_ratio.y ||
            v_texcoord.y > 1.0 - v_ratio.y
        ) {
            outColor = u_outlinecolor;

        } else {
            discard;
        }
    }
`;
