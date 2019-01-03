// time, resolution etc. are injected by three.js ShaderMaterial by default
// uniform float time;
// uniform vec2 resolution;

// But to use vUv we have to define it in vertexShader 
varying vec2 vUv;

void main()	{
    gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
    // float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
    // float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
    // gl_FragColor = vec4(vec3(min(x, y)), 1.);
}