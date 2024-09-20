attribute vec2 coordinates;
varying vec2 v_position;

void main(void) {
    v_position = coordinates;
    gl_Position = vec4(coordinates, 0.0, 1.0);
}
