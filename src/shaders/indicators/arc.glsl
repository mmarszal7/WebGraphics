varying vec2 vUv;
uniform float percentage;

vec3 colorA = vec3(0.752,0.912,0.310);
vec3 colorB = vec3(1.000,0.094,0.190);
    
void main() {
    vec2 tex = vUv;
    tex.x -= 0.5;
    float R = .5;
    float R2 = 0.25;
    float dist = sqrt(dot(tex,tex));
    float sm = smoothstep(R,R-0.005,dist);
    float sm2 = smoothstep(R2,R2+0.005,dist);
    float alpha = sm*sm2;
    float S = 0.5;
    float g = tex.x / dist;
    float ds = (1.0-pow(g,16.0))*0.005;
    float sector = -g/2.0+percentage;
    float s = smoothstep(S, S+ds, sector);
    
    // float sm3 = smoothstep(R-.01,R-0.015,dist);
    // float sm4 = smoothstep(R2+.01,R2+0.015,dist);
    // float wrapper = sm3*sm4;
    // vec4 outer = vec4(0.0, 0.0, 0.0, alpha-wrapper);

    vec3 color = mix(colorA, colorB, percentage);
    vec4 inner = vec4(color, (s*alpha));
    gl_FragColor = inner;//+outer;
}