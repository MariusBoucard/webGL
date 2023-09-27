<template>
  <div ref="container"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export default {
  mounted() {
    const materials =   this.skyboxLoader()
    console.log(materials)
    const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const skybox = new THREE.Mesh(skyboxGeometry, materials);
    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.add(skybox);
    // Create a scene, camera, and renderer
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.container.appendChild(renderer.domElement);

    // Initialize OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Customize the controls as needed
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.3;

    // Optionally, set the initial position of the camera
    camera.position.set(0, 0, 5);

    // Create a group to hold the loaded model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Define the color you want to apply to the object (e.g., red)
    const newColor = 0xff0000; // Red color

    const loader = new OBJLoader();
    loader.load("obj/penguin.obj", (object) => {
      // Iterate through the object's children (meshes)
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Create a new material with the desired color
          const newMaterial = new THREE.MeshBasicMaterial({ color: newColor });

          // const newMaterial = new THREE.MeshStandardMaterial({
          //   color: newColor, // Base color
          // //  roughness: 0.7, // Adjust the roughness (0-1)
          //  // metalness: 0.2, // Adjust the metalness (0-1)
          // });

          // Assign the new material to the child (mesh)
          child.material = newMaterial;

              }
      });

      // Add the modified object to the group
      modelGroup.add(object);

      // Optionally, you can manipulate the model's position, rotation, and scale
      object.scale.set(7, 5, 10);
    });
        // Set up lighting in your scene
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1); // Adjust the light's position
    scene.add(directionalLight);

    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update(); // Update the controls in the animation loop

      renderer.render(scene, camera);
    };

    animate();
  },
  computed: {},
  methods: {
    skyboxLoader(){
      const textureLoader = new THREE.TextureLoader();
const materials = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load('front.jpg'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('back.jpg'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('up.jpg'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('down.jpg'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('left.jpg'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('right.jpg'), side: THREE.DoubleSide }),
];
return materials
    }

  },
  data() {
    return {};
  },
};
</script>

<style></style>
