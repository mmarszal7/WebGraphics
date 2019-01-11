uniform float time;
varying vec2 vUv;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float selectRow(in vec2 st, in float row){
    return step(row - 1.0, st.y)*step(st.y, row);
}

float selectColumn(in vec2 st, in float col){
    return step(col - 1.0, st.x)*step(st.x, col);
}

void main() {
	vec2 st = vUv;
    float selector = 0.0;
        
    // Scale up the space to 3x5
    st.x *= 3.0;
    st.y *= 5.0; 
	selector = selectColumn(st, 2.0);
	selector *= selectRow(st, 2.0) + selectRow(st, 4.0);
    st = fract(st);
	
    vec3 color = vec3(st,0.0);
    vec3 mask = vec3(circle(st,0.5));
    if(fract(time) > .5){
        color = color * mask * selector;
    }

	gl_FragColor = vec4(color,1.0);
}
