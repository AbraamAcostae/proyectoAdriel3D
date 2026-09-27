import * as THREE from 'three';
import { box, addCollider } from '../utils.js';

/**
 * Creates high-resolution canvas textures for classroom and pavilion signs
 */
function createBannerTexture(title, subtitle, bgColor = '#14532d', textColor = '#ffffff', accentColor = '#39e75f') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 1024, 160);

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 1008, 144);

  ctx.fillStyle = textColor;
  ctx.font = 'bold 54px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, 512, 70);

  ctx.fillStyle = accentColor;
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillText(subtitle, 512, 122);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates canvas texture for classroom door plaques (e.g., "AULA 101 · 1° PRIMARIA")
 */
function createDoorPlaqueTexture(roomName, grade) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 128);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 120);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(roomName, 128, 52);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(grade, 128, 92);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a complete, realistic classroom interior
 */
function buildClassroomInterior(group, cx, cy, cz, roomW, roomD, type = 'primaria') {
  // Shared materials for furniture
  const deskWood = new THREE.MeshStandardMaterial({ color: 0xba854d, roughness: 0.6 });
  const metalLeg = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
  const chairBlue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.7 });
  const chairYellow = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.7 });
  const chairGreen = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
  const boardMat = new THREE.MeshStandardMaterial({ color: type === 'inicial' ? 0x1e3a8a : 0x14532d, roughness: 0.5 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7 });

  // 1. Blackboard / Whiteboard
  if (type === 'secundaria') {
    // Mount board on side divider wall so back windows are fully transparent to the farm
    const board = box(0.08, 1.8, roomD * 0.55, boardMat, cx - roomW / 2 + 0.28, cy + 2.0, cz);
    group.add(board);
    group.add(box(0.04, 1.9, roomD * 0.57, frameMat, cx - roomW / 2 + 0.26, cy + 2.0, cz));
  } else {
    const board = box(roomW * 0.55, 1.8, 0.08, boardMat, cx, cy + 2.0, cz - roomD / 2 + 0.3);
    group.add(board);
    group.add(box(roomW * 0.57, 1.9, 0.04, frameMat, cx, cy + 2.0, cz - roomD / 2 + 0.28));
  }

  // 2. Teacher's Desk & Chair at the front
  const tDeskX = type === 'secundaria' ? cx - roomW * 0.25 : cx + roomW * 0.25;
  const tDeskZ = type === 'secundaria' ? cz : cz - roomD / 2 + 1.3;
  const tDesk = box(1.6, 0.75, 0.8, deskWood, tDeskX, cy + 0.4, tDeskZ);
  group.add(tDesk);
  // Laptop on teacher's desk
  group.add(box(0.35, 0.03, 0.28, metalLeg, tDeskX, cy + 0.8, tDeskZ));
  const tLaptopScreen = box(0.35, 0.24, 0.03, new THREE.MeshStandardMaterial({ color: 0x111111 }), tDeskX, cy + 0.92, tDeskZ + 0.12);
  tLaptopScreen.rotation.x = Math.PI / 8;
  group.add(tLaptopScreen);

  // Projector hanging from ceiling
  const projMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
  const projector = box(0.4, 0.2, 0.4, projMat, cx, cy + 3.4, cz - 1.5);
  group.add(projector);
  const projMount = box(0.08, 0.4, 0.08, metalLeg, cx, cy + 3.7, cz - 1.5);
  group.add(projMount);
  // Projector beam light (volumetric fake)
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 1.2, 3.5, 16), beamMat);
  beam.position.set(cx, cy + 2.4, cz - 0.5);
  beam.rotation.x = Math.PI / 2.5;
  if (type === 'secundaria') {
    beam.position.set(cx - roomW / 2 + 1.5, cy + 2.4, cz);
    beam.rotation.x = 0;
    beam.rotation.z = Math.PI / 2.5;
  }
  group.add(beam);


  // Teacher chair
  const tChair = box(0.48, 0.5, 0.48, new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 }), tDeskX + (type === 'secundaria' ? 0.6 : 0), cy + 0.45, tDeskZ - (type === 'secundaria' ? 0 : 0.5));
  group.add(tChair);

  // 3. Student Desks and Chairs
  if (type === 'inicial') {
    // INICIAL: Round colorful activity tables with small chairs
    const tableColors = [0xfacc15, 0x38bdf8, 0x4ade80];
    const kidChairMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 });

    for (let row = 0; row < 2; row++) {
      const tz = cz - roomD * 0.15 + row * 2.2;
      for (let col = -1; col <= 1; col += 2) {
        const tx = cx + col * (roomW * 0.24);
        const tColor = tableColors[(row + col + 4) % tableColors.length];
        const roundTable = new THREE.Mesh(
          new THREE.CylinderGeometry(0.85, 0.85, 0.06, 20),
          new THREE.MeshStandardMaterial({ color: tColor, roughness: 0.4 })
        );
        roundTable.position.set(tx, cy + 0.55, tz);
        group.add(roundTable);
        group.add(box(0.1, 0.55, 0.1, metalLeg, tx, cy + 0.28, tz));

        // 4 Little chairs around table
        for (let a = 0; a < 4; a++) {
          const ang = (a / 4) * Math.PI * 2;
          const kx = tx + Math.cos(ang) * 1.1;
          const kz = tz + Math.sin(ang) * 1.1;
          const kSeat = box(0.32, 0.05, 0.32, kidChairMat, kx, cy + 0.32, kz);
          group.add(kSeat);
          group.add(box(0.3, 0.28, 0.04, kidChairMat, kx, cy + 0.48, kz));
        }
      }
    }

    // Colorful toy & book cubby
    group.add(box(0.4, 1.4, 2.4, new THREE.MeshStandardMaterial({ color: 0xf59e0b }), cx - roomW / 2 + 0.3, cy + 0.7, cz));
  } else if (type === 'secundaria' || type === 'lab') {
    // SECUNDARIA / LABORATORIO: Double modern desks in 3 rows
    for (let row = 0; row < 3; row++) {
      const dz = cz - roomD * 0.2 + row * 1.5;
      for (let col = -1; col <= 1; col++) {
        const dx = cx + col * (roomW * 0.28);

        // Desk
        const sDesk = box(1.5, 0.72, 0.55, deskWood, dx, cy + 0.38, dz);
        group.add(sDesk);
        group.add(box(0.06, 0.72, 0.06, metalLeg, dx - 0.65, cy + 0.36, dz));
        group.add(box(0.06, 0.72, 0.06, metalLeg, dx + 0.65, cy + 0.36, dz));

        // 2 Chairs and Laptops per desk
        for (const sx of [-0.4, 0.4]) {
          const seat = box(0.4, 0.05, 0.4, chairBlue, dx + sx, cy + 0.42, dz + 0.45);
          group.add(seat);
          const back = box(0.38, 0.35, 0.04, chairBlue, dx + sx, cy + 0.65, dz + 0.65);
          group.add(back);

          // Add laptop facing the front (board)
          if (type === 'secundaria' || type === 'lab') {
            const laptopBase = box(0.3, 0.02, 0.22, metalLeg, dx + sx, cy + 0.75, dz);
            const laptopScreen = box(0.3, 0.2, 0.02, new THREE.MeshStandardMaterial({ color: 0x111111 }), dx + sx, cy + 0.85, dz - 0.1);
            laptopScreen.rotation.x = -Math.PI / 8;
            group.add(laptopBase);
            group.add(laptopScreen);
          }
        }

        // Science microscope or books if lab
        if (type === 'lab' && (row + col) % 2 === 0) {
          group.add(box(0.16, 0.28, 0.16, metalLeg, dx, cy + 0.88, dz));
        }
      }
    }
  } else {
    // PRIMARIA: Classic student desks in neat rows
    for (let row = 0; row < 3; row++) {
      const dz = cz - roomD * 0.2 + row * 1.5;
      for (let col = -1; col <= 1; col++) {
        const dx = cx + col * (roomW * 0.28);

        const sDesk = box(1.4, 0.68, 0.5, deskWood, dx, cy + 0.35, dz);
        group.add(sDesk);

        for (const sx of [-0.35, 0.35]) {
          const seat = box(0.38, 0.05, 0.36, chairGreen, dx + sx, cy + 0.38, dz + 0.42);
          group.add(seat);
          const back = box(0.36, 0.32, 0.04, chairGreen, dx + sx, cy + 0.6, dz + 0.58);
          group.add(back);
        }
      }
    }
  }

  // 4. Ceiling Fluorescent / LED Luminaire (Luz de aula)
  const lampGlow = box(roomW * 0.5, 0.06, 0.6, new THREE.MeshBasicMaterial({ color: 0xffffff }), cx, cy + 3.8, cz);
  group.add(lampGlow);
}

/**
 * Builds a multi-floor school pavilion with corridors, balconies, real windows,
 * classroom doors with nameplates, visible classroom interiors, and top banners.
 */
function buildSchoolWing(scene, colliders, config) {
  const {
    id,
    name,
    subtitle,
    wingType,     // 'inicial', 'primaria', 'secundaria'
    bannerColor,  // hex color
    accentColor,
    x, z,
    length,       // along main facade axis
    depth,        // perpendicular to facade
    floors = 3,
    facing        // '+Z', '-Z', '+X', '-X'
  } = config;

  const wingGroup = new THREE.Group();
  scene.add(wingGroup);

  const floorH = 4.0;
  const totalH = floors * floorH;

  // Materials
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0xe2e6e3, roughness: 0.82 });
  const concreteDarkMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 });
  const floorSlabMat = new THREE.MeshStandardMaterial({ color: 0xcfd6ce, roughness: 0.85 });
  const windowGlassMat = new THREE.MeshStandardMaterial({
    color: 0x67c5cd,
    transparent: true,
    opacity: 0.55,
    roughness: 0.1,
    metalness: 0.25
  });
  const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
  const railingMetalMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.25 });
  const doorWoodMat = new THREE.MeshStandardMaterial({ color: 0x7c4f2e, roughness: 0.6 });

  // Orientation logic:
  // Is wing running along X (Rear Wing) or along Z (Side Wings)?
  const isAlongX = facing === '+Z' || facing === '-Z';

  const wX = isAlongX ? length : depth;
  const wZ = isAlongX ? depth : length;

  // Wing Base Collider for camera collision
  addCollider(wX, totalH, wZ, x, totalH / 2, z, colliders);

  // 1. Solid Outer Enclosure (Back and Outer Sides)
  // Roof Slab
  wingGroup.add(box(wX + 0.6, 0.4, wZ + 0.6, concreteDarkMat, x, totalH + 0.2, z));

  // --- Solar Panels on Roof ---
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x0a1020, roughness: 0.1, metalness: 0.9 });
  const pFrameMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 });
  const roofY = totalH + 0.4;
  
  const spanX = isAlongX ? 2.8 : 2.0;
  const spanZ = isAlongX ? 2.0 : 2.8;
  const startX = x - wX / 2 + 2;
  const endX = x + wX / 2 - 2;
  const startZ = z - wZ / 2 + 2;
  const endZ = z + wZ / 2 - 2;

  for (let px = startX; px <= endX; px += spanX) {
    for (let pz = startZ; pz <= endZ; pz += spanZ) {
      // Panel base frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 1.3), pFrameMat);
      frame.position.set(px, roofY + 0.35, pz);
      frame.rotation.x = Math.PI / 8;
      wingGroup.add(frame);
      // Solar cell
      const cell = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 1.2), panelMat);
      cell.position.set(px, roofY + 0.35, pz);
      cell.rotation.x = Math.PI / 8;
      wingGroup.add(cell);
      // Support legs
      wingGroup.add(box(0.06, 0.45, 0.06, pFrameMat, px - 0.9, roofY + 0.15, pz - 0.4));
      wingGroup.add(box(0.06, 0.45, 0.06, pFrameMat, px + 0.9, roofY + 0.15, pz - 0.4));
      wingGroup.add(box(0.06, 0.15, 0.06, pFrameMat, px - 0.9, roofY + 0.05, pz + 0.4));
      wingGroup.add(box(0.06, 0.15, 0.06, pFrameMat, px + 0.9, roofY + 0.05, pz + 0.4));
    }
  }
  // ----------------------------

  // Back Wall (away from courtyard)
  if (facing === '+Z') {
    // REAR WING FACING THE FINCA / GRANJA:
    // Expansive panoramic ribbon windows across all floors and central breezeway portal opening to the farm!
    const backZ = z - wZ / 2 + 0.25;
    const rSpan = length / 5;

    // 1. Structural Vertical Pilasters / Columns between the 5 classroom bays
    for (let c = 0; c <= 5; c++) {
      const colX = x - wX / 2 + c * rSpan;
      wingGroup.add(box(0.65, totalH, 0.55, concreteDarkMat, colX, totalH / 2, backZ));
    }

    // 2. Window Apertures & Farm Breezeway Openings across each floor
    for (let f = 0; f < floors; f++) {
      const yF = f * floorH;

      // Projected floor edge / architectural sunshade ledge
      wingGroup.add(box(wX + 0.4, 0.25, 0.6, concreteDarkMat, x, yF + 0.12, backZ - 0.15));

      for (let r = 0; r < 5; r++) {
        const roomCX = x - wX / 2 + r * rSpan + rSpan / 2;
        const bayW = rSpan - 0.7;

        if (f === 0 && r === 2) {
          // GROUND FLOOR CENTRAL BAY: Grand Breezeway Portal Opening to the Farm
          const portalW = 4.8;
          const portalH = 3.2;
          const sideWallW = (bayW - portalW) / 2;

          // Side masonry flanking the breezeway portal
          wingGroup.add(box(sideWallW, floorH, 0.45, concreteMat, roomCX - portalW / 2 - sideWallW / 2, yF + floorH / 2, backZ));
          wingGroup.add(box(sideWallW, floorH, 0.45, concreteMat, roomCX + portalW / 2 + sideWallW / 2, yF + floorH / 2, backZ));

          // Transom lintel wall above portal
          wingGroup.add(box(portalW, floorH - portalH, 0.45, concreteDarkMat, roomCX, yF + portalH + (floorH - portalH) / 2, backZ));

          // Double Glass French Doors & Upper Transom Windows
          wingGroup.add(box(portalW, portalH, 0.08, windowGlassMat, roomCX, yF + portalH / 2, backZ));
          wingGroup.add(box(portalW + 0.1, 0.1, 0.2, windowFrameMat, roomCX, yF + portalH, backZ));
          wingGroup.add(box(0.12, portalH, 0.2, windowFrameMat, roomCX - portalW / 2, yF + portalH / 2, backZ));
          wingGroup.add(box(0.12, portalH, 0.2, windowFrameMat, roomCX + portalW / 2, yF + portalH / 2, backZ));
          wingGroup.add(box(0.1, portalH, 0.18, windowFrameMat, roomCX, yF + portalH / 2, backZ)); // Center door split

          // Transom horizontal mullion
          wingGroup.add(box(portalW, 0.08, 0.16, windowFrameMat, roomCX, yF + 2.4, backZ));

          // Modern cantilevered entrance canopy over the farm breezeway portal
          const canopy = box(portalW + 1.2, 0.18, 1.8, concreteDarkMat, roomCX, yF + portalH + 0.1, backZ - 0.9);
          wingGroup.add(canopy);

          // Warm portal entrance spotlights
          const pLight = new THREE.PointLight(0xffedd5, 1.6, 6);
          pLight.position.set(roomCX, yF + portalH - 0.2, backZ - 0.8);
          wingGroup.add(pLight);

          // Planter columns flanking entrance
          const potMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
          for (const px of [roomCX - portalW / 2 - 0.6, roomCX + portalW / 2 + 0.6]) {
            const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 0.8, 12), potMat);
            pot.position.set(px, yF + 0.4, backZ - 0.5);
            wingGroup.add(pot);
            const shrub = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 6), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 }));
            shrub.position.set(px, yF + 0.95, backZ - 0.5);
            wingGroup.add(shrub);
          }
        } else {
          // Standard Classroom Windows overlooking the Farm
          const winH = 2.3;
          const sillH = 1.0;
          const lintelH = floorH - (sillH + winH);

          // Concrete sill spandrel
          wingGroup.add(box(bayW, sillH, 0.45, concreteMat, roomCX, yF + sillH / 2, backZ));

          // Concrete top lintel beam
          wingGroup.add(box(bayW, lintelH, 0.45, concreteDarkMat, roomCX, yF + sillH + winH + lintelH / 2, backZ));

          // Expansive Panoramic Window Glass
          const winY = yF + sillH + winH / 2;
          wingGroup.add(box(bayW - 0.1, winH - 0.05, 0.08, windowGlassMat, roomCX, winY, backZ));

          // Aluminum Frame Borders
          wingGroup.add(box(bayW, 0.08, 0.18, windowFrameMat, roomCX, yF + sillH, backZ));
          wingGroup.add(box(bayW, 0.08, 0.18, windowFrameMat, roomCX, yF + sillH + winH, backZ));
          wingGroup.add(box(0.1, winH, 0.18, windowFrameMat, roomCX - bayW / 2, winY, backZ));
          wingGroup.add(box(0.1, winH, 0.18, windowFrameMat, roomCX + bayW / 2, winY, backZ));

          // 3 Vertical Mullions dividing into 4 wide panoramic glass panes
          for (let m = 1; m <= 3; m++) {
            const mx = roomCX - bayW / 2 + (m * bayW) / 4;
            wingGroup.add(box(0.08, winH, 0.14, windowFrameMat, mx, winY, backZ));
          }

          // Horizontal Transom Mullion at 70% height
          wingGroup.add(box(bayW, 0.06, 0.14, windowFrameMat, roomCX, yF + sillH + winH * 0.72, backZ));
        }
      }
    }
  } else if (facing === '-Z') {
    wingGroup.add(box(wX, totalH, 0.5, concreteMat, x, totalH / 2, z + wZ / 2 - 0.25));
  } else if (facing === '+X') {
    wingGroup.add(box(0.5, totalH, wZ, concreteMat, x - wX / 2 + 0.25, totalH / 2, z));
  } else if (facing === '-X') {
    wingGroup.add(box(0.5, totalH, wZ, concreteMat, x + wX / 2 - 0.25, totalH / 2, z));
  }

  // Solid End Walls (Left and Right ends of the building)
  if (isAlongX) {
    wingGroup.add(box(0.5, totalH, wZ, concreteMat, x - wX / 2 + 0.25, totalH / 2, z));
    wingGroup.add(box(0.5, totalH, wZ, concreteMat, x + wX / 2 - 0.25, totalH / 2, z));
  } else {
    wingGroup.add(box(wX, totalH, 0.5, concreteMat, x, totalH / 2, z - wZ / 2 + 0.25));
    wingGroup.add(box(wX, totalH, 0.5, concreteMat, x, totalH / 2, z + wZ / 2 - 0.25));
  }

  // 2. Classrooms, Corridors, Windows, Doors on Each Floor
  const numRooms = isAlongX ? 5 : 4;
  const roomSpan = length / numRooms;
  const corridorW = 2.2; // Width of open-air access hallway

  for (let f = 0; f < floors; f++) {
    const yFloor = f * floorH;

    // Floor concrete slab
    wingGroup.add(box(wX, 0.35, wZ, floorSlabMat, x, yFloor + 0.18, z));

    // Ceiling of this floor
    if (f < floors - 1) {
      wingGroup.add(box(wX, 0.3, wZ, concreteDarkMat, x, yFloor + floorH - 0.15, z));
    }

    // Outer Corridor Balcony & Railings along the Courtyard Side
    if (facing === '+Z') {
      const corrZ = z + wZ / 2 - corridorW / 2;
      const railZ = z + wZ / 2;

      // Balcony Parapet / Railing
      wingGroup.add(box(wX, 0.95, 0.1, railingMetalMat, x, yFloor + 0.65, railZ));
      wingGroup.add(box(wX, 0.08, 0.15, concreteDarkMat, x, yFloor + 1.15, railZ));

      // Balcony vertical balusters every 1.5m
      for (let bx = x - wX / 2 + 1; bx <= x + wX / 2 - 1; bx += 2.0) {
        wingGroup.add(box(0.08, 1.0, 0.08, railingMetalMat, bx, yFloor + 0.65, railZ));
      }

      // Supporting columns along the corridor
      for (let bx = x - wX / 2 + roomSpan; bx < x + wX / 2; bx += roomSpan) {
        wingGroup.add(box(0.45, floorH - 0.4, 0.45, concreteDarkMat, bx, yFloor + floorH / 2, railZ - 0.2));
      }
    } else if (facing === '+X') {
      const railX = x + wX / 2;
      wingGroup.add(box(0.1, 0.95, wZ, railingMetalMat, railX, yFloor + 0.65, z));
      wingGroup.add(box(0.15, 0.08, wZ, concreteDarkMat, railX, yFloor + 1.15, z));

      for (let bz = z - wZ / 2 + 1; bz <= z + wZ / 2 - 1; bz += 2.0) {
        wingGroup.add(box(0.08, 1.0, 0.08, railingMetalMat, railX, yFloor + 0.65, bz));
      }

      for (let bz = z - wZ / 2 + roomSpan; bz < z + wZ / 2; bz += roomSpan) {
        wingGroup.add(box(0.45, floorH - 0.4, 0.45, concreteDarkMat, railX - 0.2, yFloor + floorH / 2, bz));
      }
    } else if (facing === '-X') {
      const railX = x - wX / 2;
      wingGroup.add(box(0.1, 0.95, wZ, railingMetalMat, railX, yFloor + 0.65, z));
      wingGroup.add(box(0.15, 0.08, wZ, concreteDarkMat, railX, yFloor + 1.15, z));

      for (let bz = z - wZ / 2 + 1; bz <= z + wZ / 2 - 1; bz += 2.0) {
        wingGroup.add(box(0.08, 1.0, 0.08, railingMetalMat, railX, yFloor + 0.65, bz));
      }

      for (let bz = z - wZ / 2 + roomSpan; bz < z + wZ / 2; bz += roomSpan) {
        wingGroup.add(box(0.45, floorH - 0.4, 0.45, concreteDarkMat, railX + 0.2, yFloor + floorH / 2, bz));
      }
    }

    // Classroom partition walls and Facade details for each room
    for (let r = 0; r < numRooms; r++) {
      const roomNum = (f + 1) * 100 + (r + 1);

      let roomLabel = `AULA ${roomNum}`;
      let roomSub = '';
      if (wingType === 'inicial') {
        const inicialGrades = ['3 AÑOS', '4 AÑOS', '5 AÑOS', 'PSICOMOTRICIDAD'];
        roomSub = f === 0 ? `INICIAL ${inicialGrades[r % 4]}` : f === 1 ? 'ARTE Y MÚSICA' : 'ROBÓTICA JR';
      } else if (wingType === 'secundaria') {
        const secGrades = ['1° SECUNDARIA', '2° SECUNDARIA', '3° SECUNDARIA', '4° SECUNDARIA', '5° PROMOCIÓN'];
        roomSub = f === 0 ? secGrades[r % 5] : f === 1 ? (r === 4 ? 'LAB. CÓMPUTO' : secGrades[r % 5]) : (r >= 3 ? 'LAB. CIENCIAS' : secGrades[r % 5]);
      } else {
        const primGrades = ['1° A', '1° B', '2° A', '2° B', '3° A', '3° B'];
        roomSub = `${f * 2 + 1}° PRIMARIA`;
      }

      const plaqueTex = createDoorPlaqueTexture(roomLabel, roomSub);

      if (isAlongX) {
        // Rear Wing running along X
        const roomCX = x - wX / 2 + r * roomSpan + roomSpan / 2;
        const roomCZ = z - corridorW / 2;
        const roomWallZ = z + wZ / 2 - corridorW; // Wall between classroom and corridor

        // Internal dividing walls between classrooms
        if (r > 0) {
          const divX = x - wX / 2 + r * roomSpan;
          wingGroup.add(box(0.25, floorH - 0.4, wZ - corridorW, concreteMat, divX, yFloor + floorH / 2, roomCZ));
        }

        // Classroom Front Facade facing Corridor (+Z):
        // Solid wall below windows (sill)
        wingGroup.add(box(roomSpan * 0.72, 1.1, 0.2, concreteMat, roomCX - roomSpan * 0.12, yFloor + 0.55, roomWallZ));

        // Modular Classroom Windows with frames
        const winW = roomSpan * 0.7;
        const winH = 2.2;
        const winX = roomCX - roomSpan * 0.12;
        const winY = yFloor + 1.1 + winH / 2;

        // Glass pane
        wingGroup.add(box(winW, winH, 0.06, windowGlassMat, winX, winY, roomWallZ));
        // Window outer frame
        wingGroup.add(box(winW, 0.08, 0.12, windowFrameMat, winX, yFloor + 1.1, roomWallZ));
        wingGroup.add(box(winW, 0.08, 0.12, windowFrameMat, winX, yFloor + 1.1 + winH, roomWallZ));
        wingGroup.add(box(0.08, winH, 0.12, windowFrameMat, winX - winW / 2, winY, roomWallZ));
        wingGroup.add(box(0.08, winH, 0.12, windowFrameMat, winX + winW / 2, winY, roomWallZ));
        // Vertical mullions dividing windows
        for (let m = -winW / 2 + 1.2; m < winW / 2; m += 1.3) {
          wingGroup.add(box(0.06, winH, 0.1, windowFrameMat, winX + m, winY, roomWallZ));
        }

        // Classroom Door
        const doorX = roomCX + roomSpan * 0.34;
        const doorW = 1.15;
        const doorH = 2.6;
        const door = box(doorW, doorH, 0.1, doorWoodMat, doorX, yFloor + doorH / 2 + 0.2, roomWallZ);
        wingGroup.add(door);

        // Door frame
        wingGroup.add(box(doorW + 0.15, 0.08, 0.14, windowFrameMat, doorX, yFloor + doorH + 0.2, roomWallZ));
        wingGroup.add(box(0.08, doorH, 0.14, windowFrameMat, doorX - doorW / 2, yFloor + doorH / 2 + 0.2, roomWallZ));
        wingGroup.add(box(0.08, doorH, 0.14, windowFrameMat, doorX + doorW / 2, yFloor + doorH / 2 + 0.2, roomWallZ));

        // Door window slit
        wingGroup.add(box(0.25, 0.8, 0.12, windowGlassMat, doorX, yFloor + 1.8, roomWallZ));
        // Brass door handle
        wingGroup.add(box(0.12, 0.06, 0.15, new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 }), doorX - 0.4, yFloor + 1.2, roomWallZ + 0.08));

        // Illuminated Door Room Plaque above door
        const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.35), new THREE.MeshBasicMaterial({ map: plaqueTex }));
        plaque.position.set(doorX, yFloor + doorH + 0.5, roomWallZ + 0.12);
        wingGroup.add(plaque);

        // Build 3D Furniture inside this classroom!
        buildClassroomInterior(wingGroup, roomCX, yFloor, roomCZ, roomSpan - 0.4, wZ - corridorW, wingType);
      } else {
        // Side Wings running along Z (Primaria or Inicial)
        const roomCZ = z - wZ / 2 + r * roomSpan + roomSpan / 2;
        const corrDir = facing === '+X' ? 1 : -1;
        const roomCX = x - (corrDir * corridorW) / 2;
        const roomWallX = x + (corrDir * (wX / 2 - corridorW));

        // Dividing wall between classrooms
        if (r > 0) {
          const divZ = z - wZ / 2 + r * roomSpan;
          wingGroup.add(box(wX - corridorW, floorH - 0.4, 0.25, concreteMat, roomCX, yFloor + floorH / 2, divZ));
        }

        // Classroom Front Facade facing Corridor
        // Sill
        wingGroup.add(box(0.2, 1.1, roomSpan * 0.72, concreteMat, roomWallX, yFloor + 0.55, roomCZ - roomSpan * 0.12));

        // Modular Windows
        const winD = roomSpan * 0.7;
        const winH = 2.2;
        const winZ = roomCZ - roomSpan * 0.12;
        const winY = yFloor + 1.1 + winH / 2;

        wingGroup.add(box(0.06, winH, winD, windowGlassMat, roomWallX, winY, winZ));
        wingGroup.add(box(0.12, 0.08, winD, windowFrameMat, roomWallX, yFloor + 1.1, winZ));
        wingGroup.add(box(0.12, 0.08, winD, windowFrameMat, roomWallX, yFloor + 1.1 + winH, winZ));
        wingGroup.add(box(0.12, winH, 0.08, windowFrameMat, roomWallX, winY, winZ - winD / 2));
        wingGroup.add(box(0.12, winH, 0.08, windowFrameMat, roomWallX, winY, winZ + winD / 2));

        for (let m = -winD / 2 + 1.2; m < winD / 2; m += 1.3) {
          wingGroup.add(box(0.1, winH, 0.06, windowFrameMat, roomWallX, winY, winZ + m));
        }

        // Classroom Door
        const doorZ = roomCZ + roomSpan * 0.34;
        const doorW = 1.15;
        const doorH = 2.6;
        wingGroup.add(box(0.1, doorH, doorW, doorWoodMat, roomWallX, yFloor + doorH / 2 + 0.2, doorZ));
        wingGroup.add(box(0.12, 0.8, 0.25, windowGlassMat, roomWallX, yFloor + 1.8, doorZ));

        // Door frame
        wingGroup.add(box(0.14, 0.08, doorW + 0.15, windowFrameMat, roomWallX, yFloor + doorH + 0.2, doorZ));
        wingGroup.add(box(0.14, doorH, 0.08, windowFrameMat, roomWallX, yFloor + doorH / 2 + 0.2, doorZ - doorW / 2));
        wingGroup.add(box(0.14, doorH, 0.08, windowFrameMat, roomWallX, yFloor + doorH / 2 + 0.2, doorZ + doorW / 2));

        // Door plaque
        const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.35), new THREE.MeshBasicMaterial({ map: plaqueTex }));
        plaque.position.set(roomWallX + corrDir * 0.12, yFloor + doorH + 0.5, doorZ);
        plaque.rotation.y = corrDir > 0 ? Math.PI / 2 : -Math.PI / 2;
        wingGroup.add(plaque);

        // Build 3D Furniture inside this classroom!
        buildClassroomInterior(wingGroup, roomCX, yFloor, roomCZ, wX - corridorW, roomSpan - 0.4, wingType);
      }
    }
  }

  // 3. Large Architectural Banner across the Top of the Building
  const bannerTex = createBannerTexture(name, subtitle, bannerColor, '#ffffff', accentColor);
  if (isAlongX) {
    const bannerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(16.0, 2.5),
      new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide })
    );
    bannerMesh.position.set(x, totalH + 1.5, z + wZ / 2 + 0.15);
    wingGroup.add(bannerMesh);
  } else {
    const bannerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(16.0, 2.5),
      new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide })
    );
    const bDir = facing === '+X' ? 1 : -1;
    bannerMesh.position.set(x + (bDir * wX) / 2 + bDir * 0.15, totalH + 1.5, z);
    bannerMesh.rotation.y = bDir > 0 ? Math.PI / 2 : -Math.PI / 2;
    wingGroup.add(bannerMesh);
  }
}

/**
 * Creates the complete campus classroom wings:
 * - North / Rear Wing: PABELLÓN DE SECUNDARIA Y LABORATORIOS
 * - West / Left Wing:  PABELLÓN DE PRIMARIA
 * - East / Right Wing: PABELLÓN DE INICIAL Y PSICOMOTRICIDAD
 */
export function createWings(scene, colliders) {
  // 1. REAR WING (Faces the courtyard towards +Z)
  // Footprint: x=0, z=-19, w=56, depth=8.5, floors=3
  buildSchoolWing(scene, colliders, {
    id: 'secundaria',
    name: '★ PABELLÓN SECUNDARIA Y LABORATORIOS ★',
    subtitle: '1° A 5° DE SECUNDARIA · LAB. QUÍMICA · CÓMPUTO Y ROBÓTICA',
    wingType: 'secundaria',
    bannerColor: '#0f2942',
    accentColor: '#38bdf8',
    x: 0,
    z: -19,
    length: 56,
    depth: 8.5,
    floors: 3,
    facing: '+Z'
  });

  // 2. LEFT WING (Faces the courtyard towards +X)
  // Footprint: x=-22, z=0, length=46, depth=10, floors=3
  buildSchoolWing(scene, colliders, {
    id: 'primaria',
    name: '★ PABELLÓN PRIMARIA · FERMÍN TANGÜIS ★',
    subtitle: '1° A 6° DE PRIMARIA · AULAS CLIMATIZADAS Y ACTIVAS',
    wingType: 'primaria',
    bannerColor: '#14532d',
    accentColor: '#4ade80',
    x: -22,
    z: 0,
    length: 46,
    depth: 10,
    floors: 3,
    facing: '+X'
  });

  // 3. RIGHT WING (Faces the courtyard towards -X)
  // Footprint: x=22, z=0, length=46, depth=10, floors=3
  buildSchoolWing(scene, colliders, {
    id: 'inicial',
    name: '★ PABELLÓN INICIAL Y PSICOMOTRICIDAD ★',
    subtitle: 'AULAS 3, 4 Y 5 AÑOS · TALLERES DE ARTE, MÚSICA Y DANZA',
    wingType: 'inicial',
    bannerColor: '#7c2d12',
    accentColor: '#facc15',
    x: 22,
    z: 0,
    length: 46,
    depth: 10,
    floors: 3,
    facing: '-X'
  });
}
