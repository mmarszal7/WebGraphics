uniform vec2 mouse;
uniform float time;
varying vec2 vUv;

void main() {
    float rnd = fract(sin(dot(vUv.xy, 1000.0*mouse)) * time);

    gl_FragColor = vec4(vec3(rnd),1.0);
}
