import * as THREE from 'three';

export const concrete = new THREE.MeshStandardMaterial({color: 0xe1e1d8, roughness: 0.78});
export const dark = new THREE.MeshStandardMaterial({color: 0x315943, roughness: 0.85});
export const glass = new THREE.MeshStandardMaterial({color: 0x3d9391, roughness: 0.18, metalness: 0.25, transparent: true, opacity: 0.72});
export const greenGlass = new THREE.MeshStandardMaterial({color: 0x176b52, roughness: 0.18, metalness: 0.2, transparent: true, opacity: 0.78});
export const roof = new THREE.MeshStandardMaterial({color: 0x52645d, roughness: 0.65});
export const turf = new THREE.MeshStandardMaterial({color: 0x235e45, roughness: 0.92});
export const soil = new THREE.MeshStandardMaterial({color: 0x634a2c, roughness: 1});
export const wood = new THREE.MeshStandardMaterial({color: 0x9c6a38, roughness: 0.85});
export const solar = new THREE.MeshStandardMaterial({color: 0x1d4ed8, emissive: 0x0c2461, metalness: 0.85, roughness: 0.2});
export const leafMat = new THREE.MeshStandardMaterial({color: 0x23713f, roughness: 1});
export const vineMat = new THREE.MeshStandardMaterial({color: 0x4f9b4d, roughness: 1});
export const colliderMaterial = new THREE.MeshBasicMaterial({visible: false});
