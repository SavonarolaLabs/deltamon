precision mediump float;
varying vec2 v_position;

void main(void) {
    float color = v_position.x * 0.5 + 0.5;
    gl_FragColor = vec4(color, 0.0, 0, v_position.x+1.0);
}
