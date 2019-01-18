# Web graphics playgound

## Resources:

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [Three.js Docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [Shaders lesson](https://github.com/Jam3/jam3-lesson-webgl-shader-threejs)
- [GLSL Cheet sheet](https://www.khronos.org/files/opengl-quick-reference-card.pdf)
- [MDN - 3d graphics theory](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory)

## Scope of this project:

- Canvas API
- SVG & GSAP
- three.js
- Shaders

---

## Canvas:

---

## SVG & GSAP:

**VievBox** - svg coordinate system is infinite, so ViewBox let you set up windows which you use to look at your picture - usefull i.a. in animations where you can move things from/to your ViewBox

**Platonic shapes:**

- Line - `<line fill="none" stroke="black" x1="50" y1="6" x2="80" y2="95"/>`
- Rectangle - `<rect x="10" y="5" fill="white" stroke="black" width="90" height="90"/>`
- Circle - `<circle fill="white" stroke="black" cx="50" cy="50" r="45"/>`
- Polygon - `<polygon fill="white" stroke="black" points="arrayOfCoordinates"/>`

  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  x="0px" y="0px" width="450px" height="100px" viewBox="0 0 450 100">

  <rect x="10" y="5" fill="white" stroke="black" width="90" height="90"/>

  <circle fill="white" stroke="black" cx="170" cy="50" r="45"/>

  <polygon fill="white" stroke="black" points="279,5 294,35 328,40 303,62 309,94 
  279,79 248,94 254,62 230,39 263,35 "/>

  <line fill="none" stroke="black" x1="410" y1="95" x2="440" y2="6"/>

  <line fill="none" stroke="black" x1="360" y1="6" x2="360" y2="95"/>

  </svg>

**Other tags:**

- Group - `<g></g>` - svg grouping tag
- Polyline - `<polyline points="14,17 86,17 77,37 30,37 52,68 82,48 "/>`
- Paths - `<path d="M7.3 75L25.9 6.8s58.4-6.4 33.5 13-41.1 32.8-11.2 30.8h15.9v5.5s42.6 18.8 0 20.6" />`

  <svg width="400px" viewBox="0 0 218.8 87.1" >
  <svg>
    <g fill="none" stroke="#000">
    <polyline points="14,17 86,17 77,37 30,37 52,68 82,48 "/>
    <path d="M133.1 58.2s12.7-69.2 24.4-47.5c0 0 4.1 8.6 9.5.9 0 0 5-10 10.4.9 0 0 12.2 32.6 13.6 43 0 0 39.8 5.4 15.8 15.4-13.2 5.5-53.8 13.1-77.4 5.9.1 0-51.9-15.4 3.7-18.6z" />
    </g>
  </svg>

<p align="center" display="inline"> 
<img width="500px" src="./docs/svgPath.png"/>
</p>

---

## Three.js:

Three.js is a 3d modeling library working on top of WebGL. Some basic concepts connected with 3d creating and displaying 3d graphics:

- Renderer
- Scene - place where
- Camera - view/virtial eye
  - Perspective - points are vanishing,
  - Ortographic - everything looks flat
- Lightning
- Mesh - "instance" of geometry, combination of geometry and material
  - Geometry - sphere, box etc.
  - Material - serface quality of a mesh:
    - MeshBasicMaterial
    - MeshNormalMaterial - for debugging - showing surfaces on 3d
    - MeshStandardMaterial - with light, shoadow etc.

---

## Shaders:

<p align="center"> 
<img src="https://mdn.mozillademos.org/files/13334/mdn-games-3d-rendering-pipeline.png"/><br>
<a src="https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory">Fig. 1 MDN docs about "Basic 3d theory"</a>
</p>

- **Shader** - small program (in this context it is written in glsl) that is ment to do a single task - function that runs on every single pixel (without knowledge of any other pixels)
- **GLSL** - OpenGL Shading Language (check [glsl lesson](https://github.com/Jam3/jam3-lesson-webgl-shader-intro#data-types--syntax))
- Basic data types:
  - bool/int/uint
  - **float** - 1.0
  - **vec2, vec3, vec4** - vectors that work are similar to structs - (1.0, 1.0, 1.0...)
  - bvec - boolean vector
  - mat2, mat3, mat4, mat2x3 - matrixes - mat2 = mat2x2
- 2 main types of shaders:
  - fragment shader - which runs once per pixel
  - vertex shader - which runs on each vertex in a geometry
- Some GLSL **keywords**:
  - attributes - position, UV coordinates, etc. - `attribute vec3 position;`
  - uniforms - constant value across all fragments/pixels (time, viewMatrix etc.) - `uniform mat4 projectionMatrix;`
  - precision - defines the floating point precision the GPU `precision highp float;`
  - varyings - a write-only value that will get passed to the fragment shader `varying float vUv;`
  - in/out/inout function arguments - in = read-only; out = write-only; inout - works similar to reference types
- Accessing structures components (e.g. position.x):
  - 3 identical variants: xyzw, rgba,stpq - and all they are eqaul to variable[0], variable[1]...
  - position.xyz = position.rgb
  - making green:
    `green.rgb = yellow.bgb; // Assign the blue channel of Yellow (0) to red and blue channels`
- Build-in Inputs, Outputs, Constants and Functions:
  - ! be sure to check [Cheet Sheet](https://www.khronos.org/files/opengl-quick-reference-card.pdf) (p. 7) !
  - gl_Color, gl_Normal, gl_Position, gl_FragCoord...
  - pow(), sqrt(), sin(), step(), smoothstep(), mix()...

## General concepts:

- normal - normal to surface = vector pointing outwards
- larp/mix - linear interpolation - giving min, max and t(0,1) returns interpolation - e.g. `larp(-1, 1, 0.5) = 0;` or `larp(0, 10, 0.2) = 2;`

---

## To do:

- research definitions for shaders and WebGl/Three.js
- check out code from workshop

- [Good Projects for Beginners:](https://erkaman.github.io/posts/beginner_computer_graphics.html?utm_source=programmingdigest&utm_medium=web&utm_campaign=featured)

  - Make a **raytracer** - a program that renders 3D scenes by sending out rays from every pixel in the screen
  - Make a **software rasterizer** - a program that renders 3D scenes

- Other
  - Make a sphere mesh using spherical coordinates, and render it.
  - Implement shader for simple diffuse and specular shading.
  - Directional Lights, point lights, and spot lights
  - Heightmap Rendering
  - Write a simple parser for a simple mesh format such as Wavefront .obj, import it into your program and render it. In particular, try and import and render meshes with textures.
  - Implement a simple minecraft renderer. It is surprisingly simple to render minecraft-like worlds, and it is also very learningful.
  - Render reflections using cubemaps
  - Shadow rendering using shadow maps.
  - Implement view frustum culling. This is a simple, yet very practical optimization technique.
  - Implement rendering of particle systems
  - Learn how to implement Gamma Correction.
  - Implement normal mapping
  - Learn how to render lots of meshes efficiently with instanced rendering
  - Animate meshes with mesh skinning.
