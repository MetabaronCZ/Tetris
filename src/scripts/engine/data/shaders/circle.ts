export const circleVS = `#version 300 es
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

export const circleFS = `#version 300 es
    precision mediump float;

    in vec2 v_ratio;
    in vec2 v_texcoord;

    uniform vec4 u_outlinecolor;

    out vec4 outColor;
 
    void main() {
        vec2 uv = v_texcoord - 0.5;
        float dist = sqrt(dot(uv, uv));

        if (dist < 0.5 && dist > 0.5 - v_ratio.x) {
            outColor = u_outlinecolor;
        } else {
            discard;
        }
    }
`;
