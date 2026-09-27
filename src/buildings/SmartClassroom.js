import * as THREE from 'three';
import { box } from '../utils.js';

/**
 * Creates dynamic CanvasTexture for the Giant 10-Meter Interactive Screen
 * Prominently displaying Colegio Fermín Tangüis branding, AI Campus, and live student interactions
 */
function createGrandProjectorScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Vibrant educational modern blue & emerald gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 512);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#0369a1');
  grad.addColorStop(1, '#064e3b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Digital grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < 1024; x += 48) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  for (let y = 0; y < 512; y += 48) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
  }

  // Gold & Cyan modern border
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 1012, 500);

  // Top Header Banner with Colegio Fermín Tangüis Branding
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(10, 10, 1004, 90);
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 36px "Arial Black", Arial, sans-serif';
  ctx.fillText('🏛️ COLEGIO FERMÍN TANGÜIS · SJL', 35, 52);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('LEMA: "CIENCIA, VIRTUD Y ACCIÓN" · INNOVACIÓN EDUCATIVA 2035', 38, 85);

  ctx.fillStyle = '#4ade80';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('● AULA INTELIGENTE ACTIVA', 980, 52);
  ctx.fillStyle = '#f1f5f9';
  ctx.font = '16px Arial';
  ctx.fillText('Red Escolar 10 Gbps Wi-Fi 7', 980, 82);
  ctx.textAlign = 'left';

  // Subtitle
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillText('TEMA: Robótica Educativa, IA y Automatización Sostenible del Campus', 35, 138);

  // Metric Cards
  const cards = [
    { title: '☀️ 800+ Paneles Solares', val: '99.2%', sub: 'Autosuficiencia en Techos', color: '#facc15' },
    { title: '🌱 Bio-Huerto & Clima', val: '21.5°C', sub: 'Invernadero Automatizado', color: '#4ade80' },
    { title: '💻 Tablets & Laptops', val: '100%', sub: 'Alumnos Conectados en Red', color: '#38bdf8' }
  ];

  cards.forEach((c, idx) => {
    const cx = 35 + idx * 320;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(cx, 165, 300, 140);
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(cx, 165, 300, 140);

    ctx.fillStyle = c.color;
    ctx.font = 'bold 20px Arial';
    ctx.fillText(c.title, cx + 18, 198);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.fillText(c.val, cx + 18, 250);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px Arial';
    ctx.fillText(c.sub, cx + 18, 285);
  });

  // Live Student Interactive Quiz & Leaderboard
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.fillRect(35, 325, 950, 165);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(35, 325, 950, 165);

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('📊 PLATAFORMA DE APRENDIZAJE INTERACTIVO FERMÍN TANGÜIS', 55, 358);

  ctx.fillStyle = '#ffffff';
  ctx.font = '18px Arial';
  ctx.fillText('Pregunta activa: ¿Qué función cumple la energía solar fotovoltaica en los pabellones de secundaria?', 55, 392);

  // Poll progress bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(55, 412, 620, 24);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(55, 412, 570, 24);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px Arial';
  ctx.fillText('92% Respondió correctamente (Abastece laboratorios y climatización)', 65, 429);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 17px Arial';
  ctx.fillText('🏆 Estudiantes destacados: Ana M. (100 pts) · Mateo R. (98 pts) · Lucía S. (95 pts)', 55, 465);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates dynamic CanvasTexture for the Smart Interactive Blackboard
 */
function createGrandBlackboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Modern porcelain interactive board in slate emerald
  ctx.fillStyle = '#064e3b';
  ctx.fillRect(0, 0, 1024, 512);
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 1016, 504);

  // Header
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 30px "Courier New", monospace';
  ctx.fillText('PIZARRA DIGITAL · COLEGIO FERMÍN TANGÜIS', 35, 52);

  ctx.fillStyle = '#ffffff';
  ctx.font = '22px "Courier New", monospace';
  ctx.fillText('1. Rendimiento del Sistema Solar Escolar:', 35, 110);
  ctx.fillStyle = '#a7f3d0';
  ctx.fillText('   Energía = Área_Techo(m²) × Radiación_SJL × Eficiencia(22%)', 35, 145);

  ctx.fillStyle = '#ffffff';
  ctx.fillText('2. Algoritmo del Invernadero Tecnológico Tangüis:', 35, 210);
  ctx.fillStyle = '#7dd3fc';
  ctx.fillText('   if (humedad_tierra < 40%) { activar_riego_por_goteo(); }', 35, 245);
  ctx.fillText('   if (temperatura > 26°C)   { abrir_ventilas_techo_vidrio(); }', 35, 280);

  ctx.fillStyle = '#ffffff';
  ctx.fillText('3. Brazo Robótico Tangüis Bot-1:', 35, 345);
  ctx.fillStyle = '#f472b6';
  ctx.fillText('   Control cinemático inverso en Python + Visión por Computadora', 35, 380);

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Profesor: Mg. Carlos Méndez · Ciclo Escolar 2035', 35, 465);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates Periodic Table Poster Texture
 */
function createPeriodicTableTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 320;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, 512, 320);
  ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 6; ctx.strokeRect(4, 4, 504, 312);
  ctx.fillStyle = '#0f172a'; ctx.font = 'bold 20px Arial'; ctx.textAlign = 'center';
  ctx.fillText('TABLA PERIÓDICA DE LOS ELEMENTOS', 256, 35);
  ctx.font = '12px Arial'; ctx.fillStyle = '#0284c7';
  ctx.fillText('LABORATORIO DE QUÍMICA Y FÍSICA · COLEGIO FERMÍN TANGÜIS', 256, 56);

  // Colored element tiles grid
  const colors = ['#f87171', '#fb923c', '#fbbf24', '#4ade80', '#38bdf8', '#818cf8', '#c084fc'];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 14; c++) {
      ctx.fillStyle = colors[(r + c) % colors.length];
      ctx.fillRect(25 + c * 33, 72 + r * 32, 28, 26);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Creates Robotics & Innovation Trophy Chart Texture
 */
function createInnovationPosterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 320;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, 512, 320);
  ctx.strokeStyle = '#facc15'; ctx.lineWidth = 6; ctx.strokeRect(4, 4, 504, 312);
  ctx.fillStyle = '#facc15'; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'center';
  ctx.fillText('🏆 CAMPEONES NACIONALES 2035', 256, 42);
  ctx.fillStyle = '#ffffff'; ctx.font = 'bold 16px Arial';
  ctx.fillText('OLIMPIADA INTERESCOLAR DE ROBÓTICA E IA', 256, 75);
  ctx.fillStyle = '#38bdf8'; ctx.font = '14px Arial';
  ctx.fillText('Colegio Fermín Tangüis · 1° Puesto Nacional', 256, 105);
  ctx.fillStyle = '#4ade80';
  ctx.fillText('Proyecto: "Campus Bioclimático con Invernadero Inteligente"', 256, 135);
  ctx.fillStyle = '#e2e8f0'; ctx.font = '13px Arial';
  ctx.fillText('• Medalla de Oro en Innovación Sostenible', 256, 180);
  ctx.fillText('• Reconocimiento Especial por Eficiencia Energética', 256, 215);
  ctx.fillText('• 800+ Paneles Solares y Huertos Automatizados', 256, 250);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Creates 3D Student figure in school uniform
 * ALL students sit oriented facing FORWARD towards the screen (-Z) and looking at their laptops
 */
function createForwardFacingStudent(x, y, z, hasRaisedHand = false) {
  const student = new THREE.Group();
  student.position.set(x, y, z);

  const uniformMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.5 }); // Bright royal navy uniform
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xe0ac69, roughness: 0.8 });
  const hairColors = [0x1c1917, 0x451a03, 0x292524, 0x09090b];
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColors[Math.abs(Math.floor(x * 7 + z * 3)) % hairColors.length], roughness: 0.9 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });

  // Torso / Sweater
  student.add(box(0.36, 0.46, 0.24, uniformMat, 0, 0.85, 0));
  // White shirt collar
  student.add(box(0.18, 0.08, 0.25, shirtMat, 0, 1.05, 0));
  // Red/Gold School tie
  student.add(box(0.06, 0.24, 0.04, new THREE.MeshStandardMaterial({ color: 0xdc2626 }), 0, 0.92, -0.13));

  // Thighs (horizontal on chair, pointing towards front -Z)
  student.add(box(0.14, 0.14, 0.42, pantsMat, -0.1, 0.55, -0.15));
  student.add(box(0.14, 0.14, 0.42, pantsMat, 0.1, 0.55, -0.15));

  // Lower legs (vertical to floor)
  student.add(box(0.12, 0.45, 0.12, pantsMat, -0.1, 0.25, -0.32));
  student.add(box(0.12, 0.45, 0.12, pantsMat, 0.1, 0.25, -0.32));

  // Shoes pointing forward
  student.add(box(0.13, 0.08, 0.2, new THREE.MeshStandardMaterial({ color: 0x09090b }), -0.1, 0.04, -0.36));
  student.add(box(0.13, 0.08, 0.2, new THREE.MeshStandardMaterial({ color: 0x09090b }), 0.1, 0.04, -0.36));

  // Arms: Typing forward on laptop
  if (hasRaisedHand) {
    // One arm raised high to participate
    student.add(box(0.1, 0.55, 0.1, uniformMat, 0.24, 1.25, -0.05));
    student.add(box(0.1, 0.12, 0.1, skinMat, 0.24, 1.55, -0.05));
    // Other arm on laptop
    student.add(box(0.1, 0.1, 0.38, uniformMat, -0.22, 0.85, -0.2));
    student.add(box(0.1, 0.08, 0.1, skinMat, -0.22, 0.85, -0.4));
  } else {
    // Both arms forward typing on laptop
    student.add(box(0.1, 0.1, 0.38, uniformMat, -0.22, 0.85, -0.2));
    student.add(box(0.1, 0.1, 0.38, uniformMat, 0.22, 0.85, -0.2));
    student.add(box(0.1, 0.08, 0.1, skinMat, -0.22, 0.85, -0.4));
    student.add(box(0.1, 0.08, 0.1, skinMat, 0.22, 0.85, -0.4));
  }

  // Head & Hair facing forward (-Z)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), skinMat);
  head.position.set(0, 1.22, 0);
  student.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), hairMat);
  hair.position.set(0, 1.26, 0.02);
  student.add(hair);

  return student;
}

/**
 * Creates 3D Teacher figure at front podium
 */
function createFrontTeacher(x, y, z) {
  const teacher = new THREE.Group();
  teacher.position.set(x, y, z);

  const blazerMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 }); // Royal blue blazer
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xd19c6a, roughness: 0.8 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.8 });

  // Legs & Shoes
  teacher.add(box(0.18, 0.85, 0.18, pantsMat, -0.16, 0.42, 0));
  teacher.add(box(0.18, 0.85, 0.18, pantsMat, 0.16, 0.42, 0));
  teacher.add(box(0.19, 0.1, 0.28, new THREE.MeshStandardMaterial({ color: 0x18181b }), -0.16, 0.05, 0.04));
  teacher.add(box(0.19, 0.1, 0.28, new THREE.MeshStandardMaterial({ color: 0x18181b }), 0.16, 0.05, 0.04));

  // Torso / Blazer
  teacher.add(box(0.48, 0.64, 0.28, blazerMat, 0, 1.15, 0));
  teacher.add(box(0.2, 0.35, 0.29, shirtMat, 0, 1.25, 0));

  // Left arm holding digital pointer/pen pointing at screen
  const armL = box(0.12, 0.55, 0.12, blazerMat, -0.32, 1.35, -0.1);
  armL.rotation.x = Math.PI / 4;
  teacher.add(armL);

  // Right arm holding digital tablet
  const armR = box(0.12, 0.55, 0.12, blazerMat, 0.32, 1.25, 0.1);
  teacher.add(armR);

  // Digital Tablet in hand
  const tablet = box(0.32, 0.42, 0.04, new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8 }), 0.35, 1.15, 0.32);
  teacher.add(tablet);
  teacher.add(box(0.28, 0.38, 0.02, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0.35, 1.15, 0.34));

  // Head & Hair
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), skinMat);
  head.position.set(0, 1.62, 0);
  teacher.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.19, 12, 8), hairMat);
  hair.position.set(0, 1.68, -0.02);
  teacher.add(hair);

  // Glasses
  teacher.add(box(0.28, 0.06, 0.08, new THREE.MeshBasicMaterial({ color: 0x09090b }), 0, 1.63, 0.16));

  return teacher;
}

/**
 * Builds the complete Grand Smart Classroom 2035:
 * Connected at the North Wing of Level -2 (X = 0, Y = -16, Z = -28)
 * Dimensions: 30m Wide × 24m Deep × 6.0m High!
 * Decorated with bright, warm educational styling (NO NEGRO), Scandinavian wood floor,
 * 24 forward-facing students looking at laptops, teacher at front, posters, robotics lab, and VR.
 */
export function buildSmartClassroom(scene) {
  const roomGroup = new THREE.Group();
  scene.add(roomGroup);

  const cX = 0;
  const floorY = -16.0;
  const ceilingY = -10.0;
  const roomH = ceilingY - floorY; // 6.0m high!
  const cZ = -28;
  const rW = 30; // 30m wide!
  const rD = 24; // 24m deep!

  // Warm, Bright, Modern Educational Materials (NO COLOR NEGRO!)
  const warmWoodFloorMat = new THREE.MeshStandardMaterial({
    color: 0xdeb887, // Warm burlywood oak parquet
    roughness: 0.35,
    metalness: 0.08
  });
  const brightWallMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9, // Soft warm off-white
    roughness: 0.85
  });
  const acousticPineWoodMat = new THREE.MeshStandardMaterial({
    color: 0xc89658, // Warm natural pine wood slats
    roughness: 0.5
  });
  const biophilicGreenMat = new THREE.MeshStandardMaterial({
    color: 0x16a34a, // Fresh living green moss accent
    roughness: 0.9
  });
  const brightCeilingMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.95
  });

  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
  const deskTopMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
  const deskTrimMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 });
  const laptopMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.3 });
  const screenGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const greenGlowMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });

  // 1. BRIGHT ARCHITECTURAL SHELL (Floor, Ceiling, Walls)
  // Warm oak floor
  const mainFloor = box(rW, 0.4, rD, warmWoodFloorMat, cX, floorY - 0.2, cZ);
  mainFloor.receiveShadow = true;
  roomGroup.add(mainFloor);

  // Bright white ceiling with recessed LED panels
  roomGroup.add(box(rW, 0.4, rD, brightCeilingMat, cX, ceilingY + 0.2, cZ));

  // Front Wall (North) in bright off-white with acoustic pine wood frame
  roomGroup.add(box(rW, roomH, 0.4, brightWallMat, cX, floorY + roomH / 2, cZ - rD / 2));
  roomGroup.add(box(rW, 0.5, 0.45, acousticPineWoodMat, cX, ceilingY - 0.25, cZ - rD / 2));
  roomGroup.add(box(rW, 0.4, 0.45, acousticPineWoodMat, cX, floorY + 0.2, cZ - rD / 2));

  // Side Walls with vertical acoustic pine slats and living biophilic green strips
  for (const sideX of [cX - rW / 2, cX + rW / 2]) {
    roomGroup.add(box(0.4, roomH, rD, brightWallMat, sideX, floorY + roomH / 2, cZ));
    // Vertical wood slats
    for (let sz = cZ - 9; sz <= cZ + 9; sz += 3.6) {
      roomGroup.add(box(0.45, roomH - 0.8, 0.8, acousticPineWoodMat, sideX, floorY + roomH / 2, sz));
      // Living moss green strip
      roomGroup.add(box(0.46, roomH - 1.2, 0.4, biophilicGreenMat, sideX, floorY + roomH / 2, sz + 1.2));
    }
  }

  // South Entrance Wall
  roomGroup.add(box(rW * 0.35, roomH, 0.4, brightWallMat, cX - rW * 0.32, floorY + roomH / 2, cZ + rD / 2));
  roomGroup.add(box(rW * 0.35, roomH, 0.4, brightWallMat, cX + rW * 0.32, floorY + roomH / 2, cZ + rD / 2));
  // Double Glass Entrance Doors
  const doorGlassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1 });
  roomGroup.add(box(rW * 0.3, roomH - 0.4, 0.08, doorGlassMat, cX, floorY + roomH / 2, cZ + rD / 2));

  // 2. WALL DECORATIONS & EDUCATIONAL POSTERS
  // A) Periodic Table of Elements on East Wall
  const pTableTex = createPeriodicTableTexture();
  const pTableMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 3.2), new THREE.MeshBasicMaterial({ map: pTableTex }));
  pTableMesh.position.set(cX + rW / 2 - 0.25, floorY + 3.2, cZ - 2.5);
  pTableMesh.rotation.y = -Math.PI / 2;
  roomGroup.add(pTableMesh);

  // B) Robotics & Innovation Championship Poster on West Wall
  const innovTex = createInnovationPosterTexture();
  const innovMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 3.2), new THREE.MeshBasicMaterial({ map: innovTex }));
  innovMesh.position.set(cX - rW / 2 + 0.25, floorY + 3.2, cZ - 2.5);
  innovMesh.rotation.y = Math.PI / 2;
  roomGroup.add(innovMesh);

  // C) Hanging Planter Boxes with green foliage along the walls
  for (let hz = cZ - 7; hz <= cZ + 7; hz += 4.5) {
    for (const hx of [cX - rW / 2 + 0.5, cX + rW / 2 - 0.5]) {
      roomGroup.add(box(0.5, 0.3, 1.8, acousticPineWoodMat, hx, floorY + 3.8, hz));
      const foliage = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 1.7), biophilicGreenMat);
      foliage.position.set(hx, floorY + 4.05, hz);
      roomGroup.add(foliage);
    }
  }

  // 3. GIANT 10-METER INTERACTIVE SCREEN & DUAL LASER PROJECTORS
  const screenTex = createGrandProjectorScreenTexture();
  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(9.6, 4.8),
    new THREE.MeshBasicMaterial({ map: screenTex, side: THREE.DoubleSide })
  );
  screenMesh.position.set(cX - 3.5, floorY + 3.4, cZ - rD / 2 + 0.32);
  roomGroup.add(screenMesh);
  // Screen frame in warm pine & gold
  roomGroup.add(box(9.8, 5.0, 0.1, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }), cX - 3.5, floorY + 3.4, cZ - rD / 2 + 0.28));

  // Dual Commercial Laser Projectors suspended from ceiling
  for (const px of [cX - 5.5, cX - 1.5]) {
    const projY = ceilingY - 0.8;
    const projZ = cZ - 2.5;
    roomGroup.add(box(0.08, 0.8, 0.08, chromeMat, px, ceilingY - 0.4, projZ));
    roomGroup.add(box(0.85, 0.3, 0.65, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }), px, projY, projZ));
    roomGroup.add(box(0.24, 0.18, 0.06, screenGlowMat, px, projY - 0.02, projZ - 0.34));

    // Volumetric Light Cone
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(2.8, 5.2, 16, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
    );
    cone.rotation.x = Math.PI / 2;
    cone.position.set(px, projY - 0.3, projZ - 2.6);
    roomGroup.add(cone);
  }

  // 4. SMART INTERACTIVE BLACKBOARD NEXT TO SCREEN
  const boardTex = createGrandBlackboardTexture();
  const boardMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(6.2, 4.2),
    new THREE.MeshBasicMaterial({ map: boardTex, side: THREE.DoubleSide })
  );
  boardMesh.position.set(cX + 6.2, floorY + 3.2, cZ - rD / 2 + 0.32);
  roomGroup.add(boardMesh);
  roomGroup.add(box(6.4, 4.4, 0.1, new THREE.MeshStandardMaterial({ color: 0x1e3a8a }), cX + 6.2, floorY + 3.2, cZ - rD / 2 + 0.28));

  // 5. TEACHER AT THE FRONT AT PODIUM
  const teacher = createFrontTeacher(cX - 2.5, floorY, cZ - rD / 2 + 2.8);
  // Teacher stands at front facing the students (+Z direction)
  teacher.rotation.y = 0; // Facing students (+Z)
  roomGroup.add(teacher);

  // Smart Interactive Teacher Podium
  const podium = box(1.8, 1.15, 0.8, new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.7 }), cX - 2.5, floorY + 0.58, cZ - rD / 2 + 1.8);
  roomGroup.add(podium);
  roomGroup.add(box(0.8, 0.04, 0.45, screenGlowMat, cX - 2.5, floorY + 1.18, cZ - rD / 2 + 1.8));

  // 6. ROWS OF STUDENT WORKSTATIONS FACING FORWARD TOWARDS SCREEN & BLACKBOARD
  // 4 Continuous Rows (6 students per row = 24 students total!)
  const rowZPositions = [cZ - 2.5, cZ + 1.5, cZ + 5.5, cZ + 9.5];
  const colXPositions = [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5];

  rowZPositions.forEach((rowZ, rIdx) => {
    // Left desk table (3 students)
    const tL = box(8.2, 0.08, 1.2, deskTopMat, cX - 4.5, floorY + 0.74, rowZ);
    tL.castShadow = true;
    roomGroup.add(tL);
    roomGroup.add(box(8.2, 0.04, 0.08, deskTrimMat, cX - 4.5, floorY + 0.72, rowZ - 0.58));

    // Right desk table (3 students)
    const tR = box(8.2, 0.08, 1.2, deskTopMat, cX + 4.5, floorY + 0.74, rowZ);
    tR.castShadow = true;
    roomGroup.add(tR);
    roomGroup.add(box(8.2, 0.04, 0.08, deskTrimMat, cX + 4.5, floorY + 0.72, rowZ - 0.58));

    // Legs
    for (const lx of [cX - 8.2, cX - 0.8, cX + 0.8, cX + 8.2]) {
      roomGroup.add(box(0.08, 0.72, 0.08, chromeMat, lx, floorY + 0.36, rowZ - 0.4));
      roomGroup.add(box(0.08, 0.72, 0.08, chromeMat, lx, floorY + 0.36, rowZ + 0.4));
    }

    // 6 Students per row
    colXPositions.forEach((stX, cIdx) => {
      const deskZ = rowZ;

      // GLOWING LAPTOP on desk facing the student
      // Base
      roomGroup.add(box(0.42, 0.02, 0.28, laptopMat, stX, floorY + 0.79, deskZ - 0.15));
      // Tilted Open Screen facing student (+Z)
      const lapScreen = box(0.42, 0.28, 0.02, laptopMat, stX, floorY + 0.94, deskZ - 0.28);
      lapScreen.rotation.x = Math.PI / 10;
      roomGroup.add(lapScreen);
      // Illuminated screen display (displaying Fermín Tangüis learning portal)
      const lapDisplay = box(0.38, 0.24, 0.01, screenGlowMat, stX, floorY + 0.94, deskZ - 0.27);
      lapDisplay.rotation.x = Math.PI / 10;
      roomGroup.add(lapDisplay);

      // Digital Stylus Tablet beside laptop
      roomGroup.add(box(0.24, 0.02, 0.32, new THREE.MeshStandardMaterial({ color: 0x1e293b }), stX + 0.38, floorY + 0.79, deskZ - 0.15));
      roomGroup.add(box(0.2, 0.01, 0.28, greenGlowMat, stX + 0.38, floorY + 0.8, deskZ - 0.15));

      // Ergonomic Swivel Chair behind desk
      const chairZ = deskZ + 0.72;
      roomGroup.add(box(0.48, 0.08, 0.48, chairMat, stX, floorY + 0.48, chairZ));
      roomGroup.add(box(0.48, 0.55, 0.08, chairMat, stX, floorY + 0.78, chairZ + 0.22));
      roomGroup.add(box(0.08, 0.44, 0.08, chromeMat, stX, floorY + 0.24, chairZ));

      // SEATED 3D STUDENT FACING FORWARD TOWARDS SCREEN AND LAPTOP!
      const hasHandRaised = (rIdx === 0 && cIdx === 2) || (rIdx === 2 && cIdx === 4);
      const student = createForwardFacingStudent(stX, floorY, chairZ - 0.12, hasHandRaised);
      // Facing forward towards -Z (rotation.y = 0)
      student.rotation.y = 0;
      roomGroup.add(student);
    });
  });

  // 7. ROBOTICS & 3D PROTOTYPING LAB CORNER (West Perimeter: X = cX - 11.5)
  const labX = cX - 11.5;
  const labZ = cZ - 2.0;

  // Sturdy Industrial Tech Workbench in Light Beech
  roomGroup.add(box(4.2, 0.9, 1.8, acousticPineWoodMat, labX, floorY + 0.45, labZ));
  roomGroup.add(box(4.4, 0.08, 2.0, deskTopMat, labX, floorY + 0.94, labZ));

  // Two Articulated Industrial Robotic Arms (KUKA / ABB style in orange & yellow)
  for (const rx of [labX - 1.2, labX + 1.2]) {
    const armMat = new THREE.MeshStandardMaterial({ color: rx < labX ? 0xf97316 : 0xfacc15, metalness: 0.7 });
    roomGroup.add(box(0.45, 0.2, 0.45, armMat, rx, floorY + 1.05, labZ));
    const seg1 = box(0.14, 0.65, 0.14, armMat, rx, floorY + 1.45, labZ);
    seg1.rotation.z = Math.PI / 7;
    roomGroup.add(seg1);
    const seg2 = box(0.12, 0.55, 0.12, chromeMat, rx - 0.18, floorY + 1.85, labZ);
    seg2.rotation.z = -Math.PI / 5;
    roomGroup.add(seg2);
    roomGroup.add(box(0.08, 0.15, 0.08, chromeMat, rx - 0.32, floorY + 2.05, labZ));
    roomGroup.add(box(0.04, 0.04, 0.04, new THREE.MeshBasicMaterial({ color: 0xef4444 }), rx - 0.32, floorY + 2.12, labZ));
  }

  // 3D Printing Enclosure with Glowing Hot-End
  const prX = labX;
  const prZ = labZ + 4.5;
  roomGroup.add(box(2.2, 0.9, 1.4, acousticPineWoodMat, prX, floorY + 0.45, prZ));
  roomGroup.add(box(1.2, 1.1, 0.9, new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 }), prX, floorY + 1.45, prZ));
  roomGroup.add(box(0.9, 0.05, 0.7, new THREE.MeshStandardMaterial({ color: 0x09090b }), prX, floorY + 1.15, prZ));
  roomGroup.add(box(0.25, 0.25, 0.25, new THREE.MeshStandardMaterial({ color: 0x22c55e }), prX, floorY + 1.28, prZ)); // 3D Green model
  roomGroup.add(box(0.06, 0.06, 0.06, screenGlowMat, prX, floorY + 1.45, prZ));

  // 8. VIRTUAL REALITY (VR) & IMMERSIVE LAB CORNER (East Perimeter: X = cX + 11.5)
  const vrX = cX + 11.5;
  const vrZ = cZ - 2.0;

  // Circular VR Boundary Guardian Mat on Floor
  const vrMatMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(2.4, 2.4, 0.04, 24),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.6 })
  );
  vrMatMesh.position.set(vrX, floorY + 0.03, vrZ);
  roomGroup.add(vrMatMesh);
  const vrRing = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.04, 8, 32), screenGlowMat);
  vrRing.rotation.x = -Math.PI / 2;
  vrRing.position.set(vrX, floorY + 0.06, vrZ);
  roomGroup.add(vrRing);

  // Student immersed in VR with headset
  const vrStudent = createForwardFacingStudent(vrX, floorY, vrZ);
  // VR Headset over eyes
  vrStudent.add(box(0.24, 0.14, 0.16, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }), 0, 1.22, -0.12));
  vrStudent.add(box(0.25, 0.04, 0.04, screenGlowMat, 0, 1.22, -0.2));
  vrStudent.rotation.y = -Math.PI / 4;
  roomGroup.add(vrStudent);

  // VR Headsets Charging Tree
  roomGroup.add(box(0.12, 1.8, 0.12, chromeMat, vrX, floorY + 0.9, vrZ + 3.8));
  for (let vh = 0; vh < 3; vh++) {
    const vy = floorY + 0.8 + vh * 0.45;
    roomGroup.add(box(0.4, 0.06, 0.06, chromeMat, vrX, vy, vrZ + 3.8));
    roomGroup.add(box(0.24, 0.14, 0.18, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }), vrX + (vh % 2 === 0 ? 0.25 : -0.25), vy + 0.06, vrZ + 3.8));
  }

  // 9. HIGH-EFFICIENCY WARM & NATURAL CEILING LIGHTING
  const aHemi = new THREE.HemisphereLight(0xfffbeb, 0xe0f2fe, 1.8);
  aHemi.position.set(cX, ceilingY, cZ);
  roomGroup.add(aHemi);

  const centerTechLight = new THREE.PointLight(0xfffbeb, 2.2, 35);
  centerTechLight.position.set(cX, ceilingY - 1.0, cZ);
  roomGroup.add(centerTechLight);

  // Luminous geometric ceiling panels
  for (const px of [cX - 7, cX, cX + 7]) {
    for (const pz of [cZ - 6, cZ, cZ + 6]) {
      roomGroup.add(box(1.8, 0.08, 1.8, new THREE.MeshBasicMaterial({ color: 0xffffff }), px, ceilingY - 0.05, pz));
    }
  }

  return roomGroup;
}
