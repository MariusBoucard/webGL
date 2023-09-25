<template>
  <div ref="container"></div>
</template>

<script>
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
export default {
  mounted() {
    const materials =   this.skyboxLoader()
    console.log(materials)
    const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    const skybox = new THREE.Mesh(skyboxGeometry, materials);
    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.add(skybox);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.container.appendChild(renderer.domElement);
      
      // Create a cube and add it to the scene
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      // scene.add(cube);
      // Create a group to hold the loaded model
const modelGroup = new THREE.Group();
scene.add(modelGroup);

// Define the color you want to apply to the object (e.g., red)
const newColor = 0xff0000; // Red color
    const penguin = {}
const loader = new OBJLoader();
loader.load("obj/penguin.obj", (object) => {
  // Iterate through the object's children (meshes)
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Create a new material with the desired color
      const newMaterial = new THREE.MeshBasicMaterial({ color: newColor });

      // Assign the new material to the child (mesh)
      child.material = newMaterial;
    }
  });

  // Add the modified object to the group
  modelGroup.add(object);

  // Optionally, you can manipulate the model's position, rotation, and scale
  object.scale.set(1, 1, 1);

});

// Set up the camera position
camera.position.z = 5;
    // Create an animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // modelGroup.children.at(0).rotation.x +=0.11
      // modelGroup.children.at(0).rotation.y +=0.11
      // modelGroup.children.at(0).rotation.z +=0.11



      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
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
