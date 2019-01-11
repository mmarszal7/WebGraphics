uniform float time;
varying vec2 vUv;

float circle(in vec2 _vUv, in float _radius){
    vec2 l = _vUv-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float selectRow(in vec2 _vUv, in float row){
    return step(row - 1.0, _vUv.y)*step(_vUv.y, row);
}

float selectColumn(in vec2 _vUv, in float col){
    return step(col - 1.0, _vUv.x)*step(_vUv.x, col);
}

void main() {
    vec2 vUv = vUv;
    float selector = 0.0;
        
    // Scale up the space to 3x5
    vUv.x *= 3.0;
    vUv.y *= 5.0; 
	selector = selectColumn(vUv, 2.0);
	selector *= selectRow(vUv, 2.0) + selectRow(vUv, 4.0);
    vUv = fract(vUv);
	
    vec3 color = vec3(vUv,0.0);
    vec3 mask = vec3(circle(vUv,0.5));
    if(fract(time) > .5){
        color = color * mask * selector;
    }

	gl_FragColor = vec4(color,1.0);
}
