import * as THREE from "three";

export class CubeDrawer {
  constructor(private context: WebGLRenderingContext, private width: number, private height: number) {}

  drawCube() {
    const renderer = new THREE.WebGLRenderer({ context: this.context });

    // Background color and alpha
    renderer.setClearColor("hsl(0, 0%, 95%)", 1);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    camera.position.set(4, 2, 2);
    camera.lookAt(new THREE.Vector3());

    // Scene
    const scene = new THREE.Scene();

    // Geometry
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: "red"
      })
    );
    scene.add(mesh);

    // Render
    return {
      render({ time }) {
        mesh.rotation.y = time * 0.25;
        renderer.render(scene, camera);
      }
    };
  }
}
