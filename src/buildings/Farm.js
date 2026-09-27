import * as THREE from 'three';
import { box } from '../utils.js';
import { wood, turf, soil, leafMat } from '../materials.js';

/**
 * Creates dynamic CanvasTexture for the Greenhouse Sign
 */
function createGreenhouseSignTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Eco-forest green gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 256);
  grad.addColorStop(0, '#064e3b');
  grad.addColorStop(0.5, '#047857');
  grad.addColorStop(1, '#064e3b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 256);

  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 1012, 244);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 44px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌱 INVERNADERO BIOCLIMÁTICO Y HUERTO INTELIGENTE', 512, 75);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText('COLEGIO FERMÍN TANGÜIS · CULTIVO SOSTENIBLE E HIDROPONÍA 2035', 512, 125);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '20px Arial';
  ctx.fillText('Tomates hidropónicos · Fresas · Hortalizas orgánicas · Riego por goteo con energía solar', 512, 180);
  ctx.fillStyle = '#facc15';
  ctx.fillText('Monitoreo IoT: Temp: 22.4°C · Humedad: 68% · pH: 6.5', 512, 220);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates the complete modern Farm & Glass Greenhouse (NO HORSES, extensive plantations)
 */
export function createFarm(scene) {
  const farmGroup = new THREE.Group();
  scene.add(farmGroup);

  // 1. Grass base pad for farm (from z=-22 to z=-56, x=-28 to +28)
  const farmPad = box(56, 0.2, 34, turf, 0, 0.1, -38);
  farmPad.receiveShadow = true;
  farmGroup.add(farmPad);

  // Clear greenhouse glass material
  const greenhouseGlassMat = new THREE.MeshStandardMaterial({
    color: 0x93c5fd,
    roughness: 0.1,
    metalness: 0.15,
    transparent: true,
    opacity: 0.42
  });

  const aluminumFrameMat = new THREE.MeshStandardMaterial({
    color: 0x15803d, // Emerald green architectural aluminum
    metalness: 0.75,
    roughness: 0.25
  });

  const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
  const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 });
  const strawberryMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
  const sunflowerYellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
  const sunflowerCenterMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
  const cornMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.8 });

  // =========================================================================
  // 2. GRAN INVERNADERO BIOCLIMÁTICO DE VIDRIO (Greenhouse)
  // Dimensions: 22m long (Z) × 14m wide (X) × 5.2m high! Located at X = +11, Z = -40
  // =========================================================================
  const ghX = 11;
  const ghZ = -40;
  const ghW = 14; // Width along X
  const ghL = 22; // Length along Z
  const wallH = 3.6;
  const roofApexH = 5.4;

  // Concrete foundation perimeter curb
  farmGroup.add(box(ghW + 0.4, 0.35, ghL + 0.4, new THREE.MeshStandardMaterial({ color: 0xd1d5db }), ghX, 0.25, ghZ));

  // Greenhouse Glass Walls
  // Front Wall (North)
  farmGroup.add(box(ghW, wallH, 0.08, greenhouseGlassMat, ghX, wallH / 2 + 0.3, ghZ - ghL / 2));
  // Back Wall (South) with sliding glass doorway
  farmGroup.add(box(ghW * 0.35, wallH, 0.08, greenhouseGlassMat, ghX - ghW * 0.32, wallH / 2 + 0.3, ghZ + ghL / 2));
  farmGroup.add(box(ghW * 0.35, wallH, 0.08, greenhouseGlassMat, ghX + ghW * 0.32, wallH / 2 + 0.3, ghZ + ghL / 2));
  // East Glass Wall
  farmGroup.add(box(0.08, wallH, ghL, greenhouseGlassMat, ghX + ghW / 2, wallH / 2 + 0.3, ghZ));
  // West Glass Wall
  farmGroup.add(box(0.08, wallH, ghL, greenhouseGlassMat, ghX - ghW / 2, wallH / 2 + 0.3, ghZ));

  // Architectural Aluminum Skeleton Pillars
  for (let z = ghZ - ghL / 2; z <= ghZ + ghL / 2 + 0.1; z += 3.66) {
    // Wall uprights
    farmGroup.add(box(0.18, wallH, 0.18, aluminumFrameMat, ghX - ghW / 2, wallH / 2 + 0.3, z));
    farmGroup.add(box(0.18, wallH, 0.18, aluminumFrameMat, ghX + ghW / 2, wallH / 2 + 0.3, z));

    // Pitched Gable Roof Trusses (Sloped glass roof panels)
    // Left roof slope
    const rSlopeL = box(ghW / 2 + 0.6, 0.06, 0.12, aluminumFrameMat, ghX - ghW / 4, (wallH + roofApexH) / 2 + 0.3, z);
    rSlopeL.rotation.z = Math.atan2(roofApexH - wallH, ghW / 2);
    farmGroup.add(rSlopeL);

    // Right roof slope
    const rSlopeR = box(ghW / 2 + 0.6, 0.06, 0.12, aluminumFrameMat, ghX + ghW / 4, (wallH + roofApexH) / 2 + 0.3, z);
    rSlopeR.rotation.z = -Math.atan2(roofApexH - wallH, ghW / 2);
    farmGroup.add(rSlopeR);

    // Center vertical ridge tie
    farmGroup.add(box(0.12, roofApexH - wallH, 0.12, aluminumFrameMat, ghX, (wallH + roofApexH) / 2 + 0.3, z));
  }

  // Pitched Glass Roof Paneling
  const roofAngle = Math.atan2(roofApexH - wallH, ghW / 2);
  const slopeLen = Math.hypot(roofApexH - wallH, ghW / 2) + 0.4;
  const glassRoofL = box(slopeLen, 0.06, ghL, greenhouseGlassMat, ghX - ghW / 4, (wallH + roofApexH) / 2 + 0.3, ghZ);
  glassRoofL.rotation.z = roofAngle;
  farmGroup.add(glassRoofL);

  const glassRoofR = box(slopeLen, 0.06, ghL, greenhouseGlassMat, ghX + ghW / 4, (wallH + roofApexH) / 2 + 0.3, ghZ);
  glassRoofR.rotation.z = -roofAngle;
  farmGroup.add(glassRoofR);

  // Roof Ridge Beam
  farmGroup.add(box(0.18, 0.2, ghL + 0.2, aluminumFrameMat, ghX, roofApexH + 0.3, ghZ));

  // Illuminated Greenhouse Signboard over entrance
  const signTex = createGreenhouseSignTexture();
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 1.8), new THREE.MeshBasicMaterial({ map: signTex }));
  signMesh.position.set(ghX, wallH + 1.2, ghZ + ghL / 2 + 0.15);
  farmGroup.add(signMesh);

  // =========================================================================
  // 3. INSIDE THE GREENHOUSE (Cultivos Protegidos de Alta Densidad)
  // =========================================================================
  // 4 Long Raised Wooden Planter Beds inside
  const bedXPositions = [ghX - 4.5, ghX - 1.5, ghX + 1.5, ghX + 4.5];
  bedXPositions.forEach((bx, bIdx) => {
    // Planter wooden box
    farmGroup.add(box(2.2, 0.55, 18, wood, bx, 0.45, ghZ));
    // Rich dark soil
    farmGroup.add(box(2.0, 0.1, 17.8, soil, bx, 0.72, ghZ));

    // Crops inside the bed
    for (let pz = ghZ - 8.2; pz <= ghZ + 8.2; pz += 1.1) {
      if (bIdx === 0) {
        // Bed 1: Ripe Red Tomatoes on bamboo climbing stakes
        farmGroup.add(box(0.04, 1.6, 0.04, wood, bx, 1.4, pz)); // Stake
        // Green vine foliage
        const vine = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 6), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.9 }));
        vine.position.set(bx, 1.2, pz);
        farmGroup.add(vine);
        // Bright red tomatoes hanging on the vine
        for (let t = 0; t < 4; t++) {
          const tom = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), tomatoMat);
          tom.position.set(bx + (t % 2 ? 0.2 : -0.2), 1.0 + (t * 0.18), pz + (t > 1 ? 0.15 : -0.15));
          farmGroup.add(tom);
        }
      } else if (bIdx === 1) {
        // Bed 2: Crisp Curly Green & Red Lettuces (2 rows per bed)
        for (const ox of [-0.6, 0.6]) {
          const lettuce = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6), ox < 0 ? lettuceMat : new THREE.MeshStandardMaterial({ color: 0x84cc16 }));
          lettuce.position.set(bx + ox, 0.85, pz);
          lettuce.scale.set(1.1, 0.7, 1.1);
          farmGroup.add(lettuce);
        }
      } else if (bIdx === 2) {
        // Bed 3: Strawberry plants with red fruit
        for (const ox of [-0.6, 0.6]) {
          const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), new THREE.MeshStandardMaterial({ color: 0x16a34a }));
          leaf.position.set(bx + ox, 0.82, pz);
          leaf.scale.set(1.2, 0.6, 1.2);
          farmGroup.add(leaf);
          // Strawberries
          const berry = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.1, 6), strawberryMat);
          berry.position.set(bx + ox + 0.12, 0.88, pz + 0.08);
          berry.rotation.x = Math.PI;
          farmGroup.add(berry);
        }
      } else {
        // Bed 4: Aromatic Herbs (Albahaca, Romero, Menta)
        for (const ox of [-0.6, 0.6]) {
          const herb = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.15, 0.45, 8), new THREE.MeshStandardMaterial({ color: 0x059669 }));
          herb.position.set(bx + ox, 0.95, pz);
          farmGroup.add(herb);
        }
      }
    }
  });

  // Vertical Hydroponic NFT White Towers inside greenhouse walkway
  for (let tz = ghZ - 6; tz <= ghZ + 6; tz += 3.0) {
    const towerMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.6, 16), towerMat);
    tower.position.set(ghX, 1.6, tz);
    farmGroup.add(tower);
    // Sprouting salad leaves in tower pockets
    for (let h = 0.5; h <= 2.4; h += 0.4) {
      const sprout = new THREE.Mesh(new THREE.SphereGeometry(0.14, 6, 5), lettuceMat);
      sprout.position.set(ghX + 0.15, h, tz);
      farmGroup.add(sprout);
    }
  }

  // Potting & Seedling Nursery Table at the back of the greenhouse
  farmGroup.add(box(4.5, 0.9, 1.4, wood, ghX, 0.5, ghZ - ghL / 2 + 1.2));
  // Seedling trays
  for (let px = ghX - 1.6; px <= ghX + 1.6; px += 0.8) {
    farmGroup.add(box(0.65, 0.1, 0.85, new THREE.MeshStandardMaterial({ color: 0x1f2937 }), px, 0.98, ghZ - ghL / 2 + 1.2));
    // Tiny green sprouts in tray
    for (let c = -0.25; c <= 0.25; c += 0.15) {
      const spr = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.08, 4), new THREE.MeshStandardMaterial({ color: 0x4ade80 }));
      spr.position.set(px + c, 1.06, ghZ - ghL / 2 + 1.2);
      farmGroup.add(spr);
    }
  }

  // =========================================================================
  // 4. OUTDOOR PLANTATIONS (Huerto Abierto y Cultivos Extensivos)
  // Located at X = -14, from Z = -26 to -52 (NO HORSES!)
  // =========================================================================
  // 8 Long Cultivation Ridges in rich tilled earth
  for (let row = 0; row < 8; row++) {
    const rowZ = -26 - row * 3.3;
    // Soil ridge
    farmGroup.add(box(24, 0.25, 2.2, soil, -14, 0.25, rowZ));

    // Irrigation drip pipe along ridge
    farmGroup.add(box(24, 0.04, 0.04, new THREE.MeshStandardMaterial({ color: 0x09090b }), -14, 0.4, rowZ));

    for (let col = 0; col < 18; col++) {
      const plantX = -24.5 + col * 1.35;

      if (row % 3 === 0) {
        // TALL CORN STALKS (Choclo / Maíz)
        farmGroup.add(box(0.08, 2.2, 0.08, cornMat, plantX, 1.3, rowZ)); // Stalk
        // Corn leaves
        const cLeaf = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.2, 5), cornMat);
        cLeaf.position.set(plantX, 1.8, rowZ);
        farmGroup.add(cLeaf);
        // Yellow corn ear
        const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 6), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        ear.position.set(plantX + 0.1, 1.2, rowZ);
        ear.rotation.z = Math.PI / 6;
        farmGroup.add(ear);
      } else if (row % 3 === 1) {
        // SUNFLOWERS (Girasoles escolares)
        farmGroup.add(box(0.08, 1.8, 0.08, new THREE.MeshStandardMaterial({ color: 0x15803d }), plantX, 1.0, rowZ));
        // Golden flower face
        const flower = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 12), sunflowerYellowMat);
        flower.rotation.x = Math.PI / 4;
        flower.position.set(plantX, 1.85, rowZ);
        farmGroup.add(flower);
        const center = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.09, 12), sunflowerCenterMat);
        center.rotation.x = Math.PI / 4;
        center.position.set(plantX, 1.86, rowZ + 0.02);
        farmGroup.add(center);
      } else {
        // PUMPKINS & SQUASH (Calabazas y hortalizas de tierra)
        const squashVine = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), new THREE.MeshStandardMaterial({ color: 0x166534 }));
        squashVine.position.set(plantX, 0.45, rowZ);
        squashVine.scale.set(1.4, 0.5, 1.4);
        farmGroup.add(squashVine);

        // Orange pumpkin
        const pumpkin = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.6 }));
        pumpkin.position.set(plantX + 0.25, 0.45, rowZ);
        pumpkin.scale.set(1.2, 0.9, 1.2);
        farmGroup.add(pumpkin);
      }
    }
  }

  // Fruit Orchard Trees (Árboles frutales: manzanas y cítricos)
  const fruitTrees = [
    { x: -24, z: -53 },
    { x: -16, z: -53 },
    { x: -8, z: -53 },
    { x: -25, z: -23 },
    { x: 24, z: -25 }
  ];

  fruitTrees.forEach((tPos) => {
    // Tree trunk
    farmGroup.add(box(0.45, 3.2, 0.45, wood, tPos.x, 1.6, tPos.z));
    // Crown
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(2.4, 1), leafMat);
    crown.position.set(tPos.x, 4.4, tPos.z);
    crown.castShadow = true;
    farmGroup.add(crown);

    // Red fruit hanging
    for (let f = 0; f < 8; f++) {
      const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 5), tomatoMat);
      fruit.position.set(tPos.x + Math.sin(f) * 1.6, 4.0 + Math.cos(f * 2) * 1.0, tPos.z + Math.cos(f) * 1.6);
      farmGroup.add(fruit);
    }
  });

  // Wooden Composters (Compostaje escolar en 3 etapas)
  for (let c = 0; c < 3; c++) {
    const compX = -3.5 + c * 2.2;
    const compZ = -53;
    farmGroup.add(box(1.8, 1.2, 1.8, wood, compX, 0.6, compZ));
    // Organic compost matter inside
    farmGroup.add(box(1.6, 0.9, 1.6, new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 1 }), compX, 0.5, compZ));
  }

  return farmGroup;
}
