# Liceo Fermín Tangüis — Visión sostenible 3D

Propuesta conceptual 3D para visualizar cómo podría evolucionar el colegio Fermín Tangüis de San Juan de Lurigancho hacia un campus educativo sostenible.

> El modelo es una interpretación arquitectónica conceptual para un proyecto académico. No representa un levantamiento técnico exacto del colegio real.

## Estado actual

- Colegio organizado como un recinto compacto y cerrado.
- Cuatro lados construidos alrededor de un patio/cancha central.
- Fachada principal inspirada en la referencia compartida:
  - volumen blanco y vidrio;
  - acceso central;
  - retícula de fachada;
  - aleros verdes;
  - jardín vertical;
  - reja, vereda, pista y autos.
- Huerto trasero separado de la fachada y del patio central.
- Invernadero trasero con estructura de madera, vidrio y cubierta piramidal.
- Suelo marrón del huerto ajustado a su propia zona para evitar desbordes visuales.
- Zona técnica diferenciada para servicios ambientales.
- Paneles solares en las cubiertas.
- Tanques de captación de agua de lluvia.
- Pérgola y área de aprendizaje al aire libre.
- Vegetación ornamental, cultivos, plantas trepadoras y plantas colgantes.
- Etiquetas 3D para Patio central, Huerto escolar, Zona técnica y Acceso principal.

## Tecnologías utilizadas

- **HTML5** para la estructura del proyecto.
- **CSS3** para el panel informativo, controles y etiquetas.
- **JavaScript ES Modules** para la lógica de la escena.
- **Three.js 0.161** como motor 3D.
- **WebGLRenderer** para renderizado acelerado por GPU.
- **OrbitControls** para rotación, zoom y recorrido libre.
- **Sky** de Three.js para cielo procedural e iluminación ambiental.
- **CSS2DRenderer** y **CSS2DObject** para señalética espacial sobre el modelo.
- **PCFSoftShadowMap** para sombras suaves.
- **ACESFilmicToneMapping** y espacio de color sRGB para una imagen más natural.
- **Vite** para desarrollo local con recarga rápida y build de producción.
- **Draco / DRACOLoader** preparado para modelos `.glb` comprimidos.
- **lil-gui** para calibrar la luz solar y activar/desactivar la cubierta del invernadero.
- **three-mesh-bvh** conectado al pipeline de geometría para acelerar consultas espaciales y limitar la cámara al perímetro arquitectónico.
- **GSAP** para transiciones cinematográficas entre vistas.
- **stats.js** como medidor FPS visible durante la exposición y el desarrollo. El paquete `lil-fps` no está publicado en npm; `stats.js` es la alternativa estable usada aquí.
- **Vercel**: configuración preparada mediante `vercel.json`, pendiente para la fase de publicación.

## Controles

- **Vista exterior**: encuadra la fachada principal.
- **Patio central**: muestra la cancha interior.
- **Huerto trasero**: muestra el invernadero y la zona agrícola.
- **Recorrido libre**: devuelve la cámara a una vista general.
- Arrastrar: orbitar la cámara.
- Rueda del mouse: acercar o alejar.
- Panel `Campus 3D`: ajustar luz solar, crecimiento visual del huerto y visibilidad de paneles solares.
- Medidor FPS: revisar rendimiento durante la exposición.

## Cómo ejecutar

### Desarrollo con Vite

Desde la carpeta del proyecto:

```powershell
npm install
npm run dev
```

Después abrir:

```text
http://localhost:5173
```

### Build de producción

```powershell
npm run build
npm run preview
```

El build queda en `dist/` y está configurado para Vercel mediante `vercel.json`.

### Modelo GLB comprimido

El cargador Draco está preparado para futuros modelos de Blender. Desde la consola del navegador se puede probar:

```js
loadCompressedCampusModel('/models/colegio.glb')
```

El modelo debe estar dentro de `public/models/` y haber sido comprimido con Draco.

## Pendiente para cerrar el modelo

- Cargar un modelo arquitectónico `.glb` creado en Blender.
- Sustituir los colliders de perímetro por un collider BVH generado desde el modelo arquitectónico GLB.
- Publicar en Vercel cuando el modelo final esté aprobado.

## Integrado en esta fase

- Draco queda listo para cargar modelos comprimidos desde `public/models/` mediante `loadCompressedCampusModel('/models/colegio.glb')`.
- GSAP mueve la cámara entre fachada, patio, huerto y recorrido libre.
- BVH limita el recorrido para que la cámara no atraviese el perímetro principal.
- lil-gui controla luz, techo, crecimiento visual del huerto y paneles solares.
- stats.js muestra el rendimiento en tiempo real.

## Archivo principal

- `index.html`: escena 3D, materiales, geometría, cámaras, controles y UI.
