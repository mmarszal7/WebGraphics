uniform float time;
uniform float percentage;
varying vec2 vUv;

vec3 colorA = vec3(0.752,0.912,0.310);
vec3 colorB = vec3(1.000,0.094,0.190);

void main() {
    float height = 1.0/step(vUv.y, percentage);
    vec3 color = mix(colorA, colorB, percentage);
    
    gl_FragColor = vec4(color*height,1.0);
}