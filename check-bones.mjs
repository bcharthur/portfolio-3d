import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load('http://127.0.0.1:5173/models/arthur.glb', (gltf) => {
  const bones = [];
  gltf.scene.traverse((obj) => {
    if (obj instanceof THREE.Bone) {
      bones.push(obj.name);
    }
  });
  
  console.log(`\nFound ${bones.length} bones:`);
  bones.forEach((name) => console.log(`  - ${name}`));
  
  // Filter for leg-related bones
  console.log('\nLeg-related bones:');
  const legBones = bones.filter(name => 
    name.toLowerCase().includes('leg') || 
    name.toLowerCase().includes('thigh') || 
    name.toLowerCase().includes('shin') || 
    name.toLowerCase().includes('foot') ||
    name.toLowerCase().includes('ankle') ||
    name.toLowerCase().includes('hip')
  );
  
  if (legBones.length === 0) {
    console.log('  None found');
  } else {
    legBones.forEach(name => console.log(`  - ${name}`));
  }
  
  process.exit(0);
}, undefined, (err) => {
  console.error('Error loading model:', err);
  process.exit(1);
});
