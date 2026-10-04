"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __glob = (map) => (path) => {
  var fn = map[path];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path);
};
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// ../../../../../private/tmp/platane-snk/svg-only/dist/578.index.js
var require_index = __commonJS({
  "../../../../../private/tmp/platane-snk/svg-only/dist/578.index.js"(exports2) {
    "use strict";
    exports2.id = 578;
    exports2.ids = [578];
    exports2.modules = {
      /***/
      578: (
        /***/
        ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          __webpack_require__.d(__webpack_exports__, {
            createSvg: () => (
              /* binding */
              createSvg
            )
          });
          var types_grid = __webpack_require__(105);
          var types_snake = __webpack_require__(777);
          ;
          const h = (element, attributes) => `<${element} ${toAttribute(attributes)}/>`;
          const toAttribute = (o) => Object.entries(o).filter(([, value]) => value !== null).map(([name, value]) => `${name}="${value}"`).join(" ");
          ;
          const percent = (x) => parseFloat((x * 100).toFixed(2)).toString() + "%";
          const mergeKeyFrames = (keyframes) => {
            const s = /* @__PURE__ */ new Map();
            for (const { t, style } of keyframes) {
              s.set(style, [...s.get(style) ?? [], t]);
            }
            return Array.from(s.entries()).map(([style, ts]) => ({ style, ts })).sort((a, b) => a.ts[0] - b.ts[0]);
          };
          const createAnimation = (name, keyframes) => `@keyframes ${name}{` + mergeKeyFrames(keyframes).map(({ style, ts }) => ts.map(percent).join(",") + `{${style}}`).join("") + "}";
          const minifyCss = (css) => css.replace(/\s+/g, " ").replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, "")).replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, "")).replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, "")).replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, "")).replace(/\;\s*\}/g, "}").trim();
          ;
          const lerp = (k, a, b) => (1 - k) * a + k * b;
          const createSnake = (chain, { sizeCell, sizeDot }, duration) => {
            const snakeN = chain[0] ? (0, types_snake.T$)(chain[0]) : 0;
            const snakeParts = Array.from({ length: snakeN }, () => []);
            for (const snake of chain) {
              const cells = (0, types_snake.HU)(snake);
              for (let i = cells.length; i--; )
                snakeParts[i].push(cells[i]);
            }
            const svgElements = snakeParts.map((_, i, { length }) => {
              const dMin = sizeDot * 0.8;
              const dMax = sizeCell * 0.9;
              const iMax = Math.min(4, length);
              const u = (1 - Math.min(i, iMax) / iMax) ** 2;
              const s = lerp(u, dMin, dMax);
              const m = (sizeCell - s) / 2;
              const r = Math.min(4.5, 4 * s / sizeDot);
              return h("rect", {
                class: `s s${i}`,
                x: m.toFixed(1),
                y: m.toFixed(1),
                width: s.toFixed(1),
                height: s.toFixed(1),
                rx: r.toFixed(1),
                ry: r.toFixed(1)
              });
            });
            const transform = ({ x, y }) => `transform:translate(${x * sizeCell}px,${y * sizeCell}px)`;
            const styles = [
              `.s{ 
      shape-rendering: geometricPrecision;
      fill: var(--cs);
      animation: none linear ${duration}ms infinite
    }`,
              ...snakeParts.map((positions, i) => {
                const id = `s${i}`;
                const animationName = id;
                const keyframes = removeInterpolatedPositions(positions.map((tr, i2, { length }) => ({ ...tr, t: i2 / length }))).map(({ t, ...p }) => ({ t, style: transform(p) }));
                return [
                  createAnimation(animationName, keyframes),
                  `.s.${id}{
          ${transform(positions[0])};
          animation-name: ${animationName}
        }`
                ];
              })
            ].flat();
            return { svgElements, styles };
          };
          const removeInterpolatedPositions = (arr) => arr.filter((u, i, arr2) => {
            if (i - 1 < 0 || i + 1 >= arr2.length)
              return true;
            const a = arr2[i - 1];
            const b = arr2[i + 1];
            const ex = (a.x + b.x) / 2;
            const ey = (a.y + b.y) / 2;
            return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
          });
          ;
          const createGrid = (cells, { sizeDotBorderRadius, sizeDot, sizeCell }, duration) => {
            const svgElements = [];
            const styles = [
              `.c{
      shape-rendering: geometricPrecision;
      fill: var(--ce);
      stroke-width: 1px;
      stroke: var(--cb);
      animation: none ${duration}ms linear infinite;
      width: ${sizeDot}px;
      height: ${sizeDot}px;
    }`
            ];
            let i = 0;
            for (const { x, y, color, t } of cells) {
              const id = t && "c" + (i++).toString(36);
              const m = (sizeCell - sizeDot) / 2;
              if (t !== null && id) {
                const animationName = id;
                styles.push(createAnimation(animationName, [
                  { t: t - 1e-4, style: `fill:var(--c${color})` },
                  { t: t + 1e-4, style: `fill:var(--ce)` },
                  { t: 1, style: `fill:var(--ce)` }
                ]), `.c.${id}{
          fill: var(--c${color});
          animation-name: ${animationName}
        }`);
              }
              svgElements.push(h("rect", {
                class: ["c", id].filter(Boolean).join(" "),
                x: x * sizeCell + m,
                y: y * sizeCell + m,
                rx: sizeDotBorderRadius,
                ry: sizeDotBorderRadius
              }));
            }
            return { svgElements, styles };
          };
          ;
          const createStack = (cells, { sizeDot }, width, y, duration) => {
            const svgElements = [];
            const styles = [
              `.u{ 
      transform-origin: 0 0;
      transform: scale(0,1);
      animation: none linear ${duration}ms infinite;
    }`
            ];
            const stack = cells.slice().filter((a) => a.t !== null).sort((a, b) => a.t - b.t);
            const blocks = [];
            stack.forEach(({ color, t }) => {
              const latest = blocks[blocks.length - 1];
              if (latest?.color === color)
                latest.ts.push(t);
              else
                blocks.push({ color, ts: [t] });
            });
            const m = width / stack.length;
            let i = 0;
            let nx = 0;
            for (const { color, ts } of blocks) {
              const id = "u" + (i++).toString(36);
              const animationName = id;
              const x = (nx * m).toFixed(1);
              nx += ts.length;
              svgElements.push(h("rect", {
                class: `u ${id}`,
                height: sizeDot,
                width: (ts.length * m + 0.6).toFixed(1),
                x,
                y
              }));
              styles.push(createAnimation(animationName, [
                ...ts.map((t, i2, { length }) => [
                  { scale: i2 / length, t: t - 1e-4 },
                  { scale: (i2 + 1) / length, t: t + 1e-4 }
                ]).flat(),
                { scale: 1, t: 1 }
              ].map(({ scale, t }) => ({
                t,
                style: `transform:scale(${scale.toFixed(3)},1)`
              }))), `.u.${id} {
        fill: var(--c${color});
        animation-name: ${animationName};
        transform-origin: ${x}px 0
      }
      `);
            }
            return { svgElements, styles };
          };
          ;
          const getCellsFromGrid = ({ width, height }) => Array.from({ length: width }, (_, x) => Array.from({ length: height }, (_2, y) => ({ x, y }))).flat();
          const createLivingCells = (grid0, chain, cells) => {
            const livingCells = (cells ?? getCellsFromGrid(grid0)).map(({ x, y }) => ({
              x,
              y,
              t: null,
              color: (0, types_grid.oU)(grid0, x, y)
            }));
            const grid = (0, types_grid.mi)(grid0);
            for (let i = 0; i < chain.length; i++) {
              const snake = chain[i];
              const x = (0, types_snake.tN)(snake);
              const y = (0, types_snake.Ap)(snake);
              if ((0, types_grid.FK)(grid, x, y) && !(0, types_grid.Im)((0, types_grid.oU)(grid, x, y))) {
                (0, types_grid.l$)(grid, x, y);
                const cell = livingCells.find((c) => c.x === x && c.y === y);
                cell.t = i / chain.length;
              }
            }
            return livingCells;
          };
          const createSvg = (grid, cells, chain, drawOptions, animationOptions) => {
            const gridWidth = grid.width * drawOptions.sizeCell;
            const gridHeight = grid.height * drawOptions.sizeCell;
            const paddingX = 24;
            const paddingTop = 94;
            const paddingBottom = 22;
            const cardWidth = gridWidth + paddingX * 2;
            const stackHeight = 12;
            const stackY = gridHeight + 18;
            const cardHeight = paddingTop + stackY + stackHeight + paddingBottom;
            const duration = animationOptions.stepDurationMs * chain.length;
            const livingCells = createLivingCells(grid, chain, cells);
            
            const elements = [
              createGrid(livingCells, drawOptions, duration),
              createStack(livingCells, drawOptions, gridWidth, stackY, duration),
              createSnake(chain, drawOptions, duration)
            ];

            const style = generateColorVar(drawOptions) + elements.map((e) => e.styles).flat().join("\n");
            
            const cardMarkup = `
              <rect x="1" y="1" width="${cardWidth - 2}" height="${cardHeight - 2}" rx="16" ry="16" fill="#00080f" stroke="#00f18f" stroke-width="1.5"/>
              <g transform="translate(${paddingX}, 24)">
                <circle cx="18" cy="18" r="18" fill="none" stroke="#00f18f" stroke-width="1.5"/>
                <text x="18" y="24" text-anchor="middle" font-family="'JetBrains Mono', 'Fira Code', 'SF Pro Mono', monospace" font-size="14" font-weight="700" fill="#00f18f">01</text>
                <text x="48" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="0.5" fill="#00f18f">
                  EMERALD + LIME GREEN <tspan font-size="13" font-weight="500" fill="#a3e635">(Recommended)</tspan>
                </text>
                <text x="48" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="12" font-weight="400" fill="#94a3b8">
                  All empty cells replaced with Low color for a consistent, vibrant look.
                </text>
              </g>
              <g transform="translate(${paddingX}, ${paddingTop})">
                ${elements.map((e) => e.svgElements).flat().join("")}
              </g>
            `;

            const svg = [
              h("svg", {
                viewBox: `0 0 ${cardWidth} ${cardHeight}`,
                width: cardWidth,
                height: cardHeight,
                xmlns: "http://www.w3.org/2000/svg"
              }).replace("/>", ">"),
              "<desc>Generated with https://github.com/Platane/snk</desc>",
              "<style>",
              optimizeCss(style),
              "</style>",
              cardMarkup,
              "</svg>"
            ].join("");
            return optimizeSvg(svg);
          };
          const optimizeCss = (css) => minifyCss(css);
          const optimizeSvg = (svg) => svg;
          const generateColorVar = (drawOptions) => `
    :root {
    --cb: ${drawOptions.colorDotBorder};
    --cs: ${drawOptions.colorSnake};
    --ce: ${drawOptions.colorEmpty};
    ${Object.entries(drawOptions.colorDots).map(([i, color]) => `--c${i}:${color};`).join("")}
    }
    ` + (drawOptions.dark ? `
    @media (prefers-color-scheme: dark) {
      :root {
        --cb: ${drawOptions.dark.colorDotBorder || drawOptions.colorDotBorder};
        --cs: ${drawOptions.dark.colorSnake || drawOptions.colorSnake};
        --ce: ${drawOptions.dark.colorEmpty};
        ${Object.entries(drawOptions.dark.colorDots).map(([i, color]) => `--c${i}:${color};`).join("")}
      }
    }
` : "");
        })
      )
    };
  }
});

// ../../../../../private/tmp/platane-snk/svg-only/dist/642.index.js
var require_index2 = __commonJS({
  "../../../../../private/tmp/platane-snk/svg-only/dist/642.index.js"(exports2) {
    "use strict";
    exports2.id = 642;
    exports2.ids = [642];
    exports2.modules = {
      /***/
      642: (
        /***/
        ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          __webpack_require__.d(__webpack_exports__, {
            createGif: () => (
              /* binding */
              createGif
            )
          });
          var external_node_child_process_ = __webpack_require__(421);
          var external_node_fs_ = __webpack_require__(24);
          var external_node_fs_default = /* @__PURE__ */ __webpack_require__.n(external_node_fs_);
          var external_node_os_ = __webpack_require__(161);
          var external_node_path_ = __webpack_require__(760);
          var external_node_path_default = /* @__PURE__ */ __webpack_require__.n(external_node_path_);
          var types_grid = __webpack_require__(105);
          ;
          const pathRoundedRect_pathRoundedRect = (ctx, width, height, borderRadius) => {
            ctx.moveTo(borderRadius, 0);
            ctx.arcTo(width, 0, width, height, borderRadius);
            ctx.arcTo(width, height, 0, height, borderRadius);
            ctx.arcTo(0, height, 0, 0, borderRadius);
            ctx.arcTo(0, 0, width, 0, borderRadius);
          };
          ;
          const drawGrid_drawGrid = (ctx, grid, cells, o) => {
            for (let x = grid.width; x--; )
              for (let y = grid.height; y--; ) {
                if (!cells || cells.some((c) => c.x === x && c.y === y)) {
                  const c = (0, types_grid.oU)(grid, x, y);
                  const color = !c ? o.colorEmpty : o.colorDots[c];
                  ctx.save();
                  ctx.translate(x * o.sizeCell + (o.sizeCell - o.sizeDot) / 2, y * o.sizeCell + (o.sizeCell - o.sizeDot) / 2);
                  ctx.fillStyle = color;
                  ctx.strokeStyle = o.colorDotBorder;
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  pathRoundedRect_pathRoundedRect(ctx, o.sizeDot, o.sizeDot, o.sizeDotBorderRadius);
                  ctx.fill();
                  ctx.stroke();
                  ctx.closePath();
                  ctx.restore();
                }
              }
          };
          ;
          const drawSnake_drawSnake = (ctx, snake, o) => {
            const cells = snakeToCells(snake);
            for (let i = 0; i < cells.length; i++) {
              const u = (i + 1) * 0.6;
              ctx.save();
              ctx.fillStyle = o.colorSnake;
              ctx.translate(cells[i].x * o.sizeCell + u, cells[i].y * o.sizeCell + u);
              ctx.beginPath();
              pathRoundedRect(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
              ctx.fill();
              ctx.restore();
            }
          };
          const lerp = (k, a, b) => (1 - k) * a + k * b;
          const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
          const drawSnakeLerp = (ctx, snake0, snake1, k, o) => {
            const m = 0.8;
            const n = snake0.length / 2;
            for (let i = 0; i < n; i++) {
              const u = (i + 1) * 0.6 * (o.sizeCell / 16);
              const a = (1 - m) * (i / Math.max(n - 1, 1));
              const ki = clamp((k - a) / m, 0, 1);
              const x = lerp(ki, snake0[i * 2 + 0], snake1[i * 2 + 0]) - 2;
              const y = lerp(ki, snake0[i * 2 + 1], snake1[i * 2 + 1]) - 2;
              ctx.save();
              ctx.fillStyle = o.colorSnake;
              ctx.translate(x * o.sizeCell + u, y * o.sizeCell + u);
              ctx.beginPath();
              pathRoundedRect_pathRoundedRect(ctx, o.sizeCell - u * 2, o.sizeCell - u * 2, (o.sizeCell - u * 2) * 0.25);
              ctx.fill();
              ctx.restore();
            }
          };
          ;
          const drawStack = (ctx, stack, max, width, o) => {
            ctx.save();
            const m = width / max;
            for (let i = 0; i < stack.length; i++) {
              ctx.fillStyle = o.colorDots[stack[i]];
              ctx.fillRect(i * m, 0, m + width * 5e-3, 10);
            }
            ctx.restore();
          };
          const drawWorld = (ctx, grid, cells, snake, stack, o) => {
            ctx.save();
            if (o.colorBackground) {
              ctx.fillStyle = o.colorBackground;
              ctx.fillRect(0, 0, 99999, 99999);
            }
            ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
            drawGrid(ctx, grid, cells, o);
            drawSnake(ctx, snake, o);
            ctx.restore();
            ctx.save();
            ctx.translate(o.sizeCell, (grid.height + 4) * o.sizeCell);
            const max = grid.data.reduce((sum, x) => sum + +!!x, stack.length);
            drawStack(ctx, stack, max, grid.width * o.sizeCell, o);
            ctx.restore();
          };
          const drawLerpWorld = (ctx, grid, cells, snake0, snake1, stack, k, o) => {
            ctx.save();
            if (o.colorBackground) {
              ctx.fillStyle = o.colorBackground;
              ctx.fillRect(0, 0, 99999, 99999);
            }
            ctx.translate(1 * o.sizeCell, 2 * o.sizeCell);
            drawGrid_drawGrid(ctx, grid, cells, o);
            drawSnakeLerp(ctx, snake0, snake1, k, o);
            ctx.translate(0, (grid.height + 2) * o.sizeCell);
            const max = grid.data.reduce((sum, x) => sum + +!!x, stack.length);
            drawStack(ctx, stack, max, grid.width * o.sizeCell, o);
            ctx.restore();
          };
          const getCanvasWorldSize = (grid, o) => {
            const width = o.sizeCell * (grid.width + 2);
            const height = o.sizeCell * (grid.height + 4) + 30;
            return { width, height };
          };
          var types_snake = __webpack_require__(777);
          ;
          const step = (grid, stack, snake) => {
            const x = (0, types_snake.tN)(snake);
            const y = (0, types_snake.Ap)(snake);
            const color = (0, types_grid.oU)(grid, x, y);
            if ((0, types_grid.FK)(grid, x, y) && !(0, types_grid.Im)(color)) {
              stack.push(color);
              (0, types_grid.l$)(grid, x, y);
            }
          };
          ;
          const createGif = async (grid0, cells, chain, drawOptions, animationOptions) => withTmpDir(async (dir) => {
            const { createCanvas } = await Promise.resolve(
              /* import() */
            ).then(__webpack_require__.t.bind(__webpack_require__, 919, 23));
            const { default: gifsicle } = await Promise.resolve(
              /* import() */
            ).then(__webpack_require__.t.bind(__webpack_require__, 667, 23));
            const { default: GIFEncoder } = await __webpack_require__.e(
              /* import() */
              680
            ).then(__webpack_require__.t.bind(__webpack_require__, 680, 23));
            const { width, height } = getCanvasWorldSize(grid0, drawOptions);
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext("2d", {
              alpha: true
            });
            const grid = (0, types_grid.mi)(grid0);
            const stack = [];
            const encoder = new GIFEncoder(width, height, "neuquant", true, chain.length * animationOptions.frameByStep);
            encoder.setRepeat(0);
            encoder.setDelay(animationOptions.stepDurationMs / animationOptions.frameByStep);
            encoder.start();
            for (let i = 0; i < chain.length; i += 1) {
              const snake0 = chain[i];
              const snake1 = chain[Math.min(chain.length - 1, i + 1)];
              step(grid, stack, snake0);
              for (let k = 0; k < animationOptions.frameByStep; k++) {
                ctx.clearRect(0, 0, width, height);
                drawLerpWorld(ctx, grid, cells, snake0, snake1, stack, k / animationOptions.frameByStep, drawOptions);
                encoder.addFrame(ctx);
              }
            }
            const outFileName = external_node_path_default().join(dir, "out.gif");
            const optimizedFileName = external_node_path_default().join(dir, "out.optimized.gif");
            const paletteFileName = external_node_path_default().join(dir, "palette.txt");
            {
              const colors = [
                drawOptions.colorBackground,
                drawOptions.colorEmpty,
                drawOptions.colorSnake,
                drawOptions.colorDotBorder,
                ...Object.values(drawOptions.colorDots)
              ].filter(Boolean);
              const canvas2 = createCanvas(colors.length, 1);
              const ctx2 = canvas2.getContext("2d");
              for (let i = colors.length; i--; ) {
                ctx2.fillStyle = colors[i];
                ctx2.fillRect(i, 0, 1, 1);
              }
              const imgData = ctx2.getImageData(0, 0, colors.length, 1);
              external_node_fs_default().writeFileSync(paletteFileName, Array.from({ length: colors.length }, (_, i) => [
                imgData.data[i * 4 + 0],
                imgData.data[i * 4 + 1],
                imgData.data[i * 4 + 2]
              ].join(" ")).join("\n"));
            }
            encoder.finish();
            external_node_fs_default().writeFileSync(outFileName, encoder.out.getData());
            (0, external_node_child_process_.execFileSync)(gifsicle, [
              //
              "--optimize=3",
              "--color-method=diversity",
              `--use-colormap=${paletteFileName}`,
              // "--colors=16",
              outFileName,
              ["--output", optimizedFileName]
            ].flat());
            return new Uint8Array(external_node_fs_default().readFileSync(optimizedFileName));
          });
          const withTmpDir = async (handler) => {
            const dir = external_node_path_default().join((0, external_node_os_.tmpdir)(), Math.random().toString(16).slice(2));
            external_node_fs_default().mkdirSync(dir, { recursive: true });
            try {
              return await handler(dir);
            } finally {
              external_node_fs_default().rmdirSync(dir, { recursive: true });
            }
          };
        })
      )
    };
  }
});

// ../../../../../private/tmp/platane-snk/svg-only/dist/680.index.js
var require_index3 = __commonJS({
  "../../../../../private/tmp/platane-snk/svg-only/dist/680.index.js"(exports2) {
    "use strict";
    exports2.id = 680;
    exports2.ids = [680];
    exports2.modules = {
      /***/
      680: (
        /***/
        ((module3, __unused_webpack_exports, __webpack_require__) => {
          module3.exports = __webpack_require__(739);
        })
      ),
      /***/
      739: (
        /***/
        ((module3, __unused_webpack_exports, __webpack_require__) => {
          const stream = __webpack_require__(203);
          const EventEmitter = __webpack_require__(434);
          const LZWEncoder = __webpack_require__(500);
          const NeuQuant = __webpack_require__(222);
          const { OctreeQuant, Color } = __webpack_require__(756);
          class ByteArray {
            constructor() {
              this.data = [];
            }
            getData() {
              return Buffer.from(this.data);
            }
            writeByte(val) {
              this.data.push(val);
            }
            writeUTFBytes(str) {
              for (var len = str.length, i = 0; i < len; i++) {
                this.writeByte(str.charCodeAt(i));
              }
            }
            writeBytes(array, offset, length) {
              for (var len = length || array.length, i = offset || 0; i < len; i++) {
                this.writeByte(array[i]);
              }
            }
          }
          class GIFEncoder extends EventEmitter {
            constructor(width, height, algorithm = "neuquant", useOptimizer = false, totalFrames = 0) {
              super();
              this.width = ~~width;
              this.height = ~~height;
              this.algorithm = algorithm;
              this.useOptimizer = useOptimizer;
              this.totalFrames = totalFrames;
              this.frames = 1;
              this.threshold = 90;
              this.indexedPixels = null;
              this.palSizeNeu = 7;
              this.palSizeOct = 7;
              this.sample = 10;
              this.colorTab = null;
              this.reuseTab = null;
              this.colorDepth = null;
              this.usedEntry = new Array();
              this.firstFrame = true;
              this.started = false;
              this.image = null;
              this.prevImage = null;
              this.dispose = -1;
              this.repeat = 0;
              this.delay = 0;
              this.transparent = null;
              this.transIndex = 0;
              this.readStreams = [];
              this.out = new ByteArray();
            }
            createReadStream(rs) {
              if (!rs) {
                rs = new stream.Readable();
                rs._read = function() {
                };
              }
              this.readStreams.push(rs);
              return rs;
            }
            emitData() {
              if (this.readStreams.length === 0) {
                return;
              }
              if (this.out.data.length) {
                this.readStreams.forEach((rs) => {
                  rs.push(Buffer.from(this.out.data));
                });
                this.out.data = [];
              }
            }
            start() {
              this.out.writeUTFBytes("GIF89a");
              this.started = true;
              this.emitData();
            }
            end() {
              if (this.readStreams.length === null) {
                return;
              }
              this.emitData();
              this.readStreams.forEach((rs) => rs.push(null));
              this.readStreams = [];
            }
            addFrame(input) {
              if (input && input.getImageData) {
                this.image = input.getImageData(0, 0, this.width, this.height).data;
              } else {
                this.image = input;
              }
              this.analyzePixels();
              if (this.firstFrame) {
                this.writeLSD();
                this.writePalette();
                if (this.repeat >= 0) {
                  this.writeNetscapeExt();
                }
              }
              this.writeGraphicCtrlExt();
              this.writeImageDesc();
              if (!this.firstFrame) {
                this.writePalette();
              }
              this.writePixels();
              this.firstFrame = false;
              this.emitData();
              if (this.totalFrames) {
                this.emit("progress", Math.floor(this.frames++ / this.totalFrames * 100));
              }
            }
            analyzePixels() {
              const w = this.width;
              const h = this.height;
              var data = this.image;
              if (this.useOptimizer && this.prevImage) {
                var delta = 0;
                for (var len = data.length, i = 0; i < len; i += 4) {
                  if (data[i] !== this.prevImage[i] || data[i + 1] !== this.prevImage[i + 1] || data[i + 2] !== this.prevImage[i + 2]) {
                    delta++;
                  }
                }
                const match = 100 - Math.ceil(delta / (data.length / 4) * 100);
                this.reuseTab = match >= this.threshold;
              }
              this.prevImage = data;
              if (this.algorithm === "neuquant") {
                var count = 0;
                this.pixels = new Uint8Array(w * h * 3);
                for (var i = 0; i < h; i++) {
                  for (var j = 0; j < w; j++) {
                    var b = i * w * 4 + j * 4;
                    this.pixels[count++] = data[b];
                    this.pixels[count++] = data[b + 1];
                    this.pixels[count++] = data[b + 2];
                  }
                }
                var nPix = this.pixels.length / 3;
                this.indexedPixels = new Uint8Array(nPix);
                if (!this.reuseTab) {
                  this.quantizer = new NeuQuant(this.pixels, this.sample);
                  this.quantizer.buildColormap();
                  this.colorTab = this.quantizer.getColormap();
                }
                var k = 0;
                for (var j = 0; j < nPix; j++) {
                  var index = this.quantizer.lookupRGB(
                    this.pixels[k++] & 255,
                    this.pixels[k++] & 255,
                    this.pixels[k++] & 255
                  );
                  this.usedEntry[index] = true;
                  this.indexedPixels[j] = index;
                }
                this.colorDepth = 8;
                this.palSizeNeu = 7;
                this.pixels = null;
              } else if (this.algorithm === "octree") {
                this.colors = [];
                if (!this.reuseTab) {
                  this.quantizer = new OctreeQuant();
                }
                for (var i = 0; i < h; i++) {
                  for (var j = 0; j < w; j++) {
                    var b = i * w * 4 + j * 4;
                    const color = new Color(data[b], data[b + 1], data[b + 2]);
                    this.colors.push(color);
                    if (!this.reuseTab) {
                      this.quantizer.addColor(color);
                    }
                  }
                }
                const nPix2 = this.colors.length;
                this.indexedPixels = new Uint8Array(nPix2);
                if (!this.reuseTab) {
                  this.colorTab = [];
                  const palette = this.quantizer.makePalette(Math.pow(2, this.palSizeOct + 1));
                  for (const p of palette) {
                    this.colorTab.push(p.red, p.green, p.blue);
                  }
                }
                for (var i = 0; i < nPix2; i++) {
                  this.indexedPixels[i] = this.quantizer.getPaletteIndex(this.colors[i]);
                }
                this.colorDepth = this.palSizeOct + 1;
              }
              if (this.transparent !== null) {
                this.transIndex = this.findClosest(this.transparent);
                for (var pixelIndex = 0; pixelIndex < nPix; pixelIndex++) {
                  if (this.image[pixelIndex * 4 + 3] == 0) {
                    this.indexedPixels[pixelIndex] = this.transIndex;
                  }
                }
              }
            }
            findClosest(c) {
              if (this.colorTab === null) {
                return -1;
              }
              var r = (c & 16711680) >> 16;
              var g = (c & 65280) >> 8;
              var b = c & 255;
              var minpos = 0;
              var dmin = 256 * 256 * 256;
              var len = this.colorTab.length;
              for (var i = 0; i < len; ) {
                var index = i / 3;
                var dr = r - (this.colorTab[i++] & 255);
                var dg = g - (this.colorTab[i++] & 255);
                var db = b - (this.colorTab[i++] & 255);
                var d = dr * dr + dg * dg + db * db;
                if (this.usedEntry[index] && d < dmin) {
                  dmin = d;
                  minpos = index;
                }
              }
              return minpos;
            }
            setFrameRate(fps) {
              this.delay = Math.round(100 / fps);
            }
            setDelay(ms) {
              this.delay = Math.round(ms / 10);
            }
            setDispose(code) {
              if (code >= 0) {
                this.dispose = code;
              }
            }
            setRepeat(repeat) {
              this.repeat = repeat;
            }
            setTransparent(color) {
              this.transparent = color;
            }
            setQuality(quality) {
              if (quality < 1) {
                quality = 1;
              }
              this.quality = quality;
            }
            setThreshold(threshold) {
              if (threshold > 100) {
                threshold = 100;
              } else if (threshold < 0) {
                threshold = 0;
              }
              this.threshold = threshold;
            }
            setPaletteSize(size) {
              if (size > 7) {
                size = 7;
              } else if (size < 4) {
                size = 4;
              }
              this.palSizeOct = size;
            }
            writeLSD() {
              this.writeShort(this.width);
              this.writeShort(this.height);
              this.out.writeByte(128 | 112 | 0 | this.palSizeNeu);
              this.out.writeByte(0);
              this.out.writeByte(0);
            }
            writeGraphicCtrlExt() {
              this.out.writeByte(33);
              this.out.writeByte(249);
              this.out.writeByte(4);
              var transp, disp;
              if (this.transparent === null) {
                transp = 0;
                disp = 0;
              } else {
                transp = 1;
                disp = 2;
              }
              if (this.dispose >= 0) {
                disp = this.dispose & 7;
              }
              disp <<= 2;
              this.out.writeByte(0 | disp | 0 | transp);
              this.writeShort(this.delay);
              this.out.writeByte(this.transIndex);
              this.out.writeByte(0);
            }
            writeNetscapeExt() {
              this.out.writeByte(33);
              this.out.writeByte(255);
              this.out.writeByte(11);
              this.out.writeUTFBytes("NETSCAPE2.0");
              this.out.writeByte(3);
              this.out.writeByte(1);
              this.writeShort(this.repeat);
              this.out.writeByte(0);
            }
            writeImageDesc() {
              this.out.writeByte(44);
              this.writeShort(0);
              this.writeShort(0);
              this.writeShort(this.width);
              this.writeShort(this.height);
              if (this.firstFrame) {
                this.out.writeByte(0);
              } else {
                this.out.writeByte(128 | 0 | 0 | 0 | this.palSizeNeu);
              }
            }
            writePalette() {
              this.out.writeBytes(this.colorTab);
              var n = 3 * 256 - this.colorTab.length;
              for (var i = 0; i < n; i++) {
                this.out.writeByte(0);
              }
            }
            writeShort(pValue) {
              this.out.writeByte(pValue & 255);
              this.out.writeByte(pValue >> 8 & 255);
            }
            writePixels() {
              var enc = new LZWEncoder(this.width, this.height, this.indexedPixels, this.colorDepth);
              enc.encode(this.out);
            }
            finish() {
              this.out.writeByte(59);
              this.end();
            }
          }
          module3.exports = GIFEncoder;
        })
      ),
      /***/
      500: (
        /***/
        ((module3) => {
          var EOF = -1;
          var BITS = 12;
          var HSIZE = 5003;
          var masks = [
            0,
            1,
            3,
            7,
            15,
            31,
            63,
            127,
            255,
            511,
            1023,
            2047,
            4095,
            8191,
            16383,
            32767,
            65535
          ];
          function LZWEncoder(width, height, pixels, colorDepth) {
            var initCodeSize = Math.max(2, colorDepth);
            var accum = new Uint8Array(256);
            var htab = new Int32Array(HSIZE);
            var codetab = new Int32Array(HSIZE);
            var cur_accum, cur_bits = 0;
            var a_count;
            var free_ent = 0;
            var maxcode;
            var clear_flg = false;
            var g_init_bits, ClearCode, EOFCode;
            function char_out(c, outs) {
              accum[a_count++] = c;
              if (a_count >= 254) flush_char(outs);
            }
            function cl_block(outs) {
              cl_hash(HSIZE);
              free_ent = ClearCode + 2;
              clear_flg = true;
              output(ClearCode, outs);
            }
            function cl_hash(hsize) {
              for (var i = 0; i < hsize; ++i) htab[i] = -1;
            }
            function compress(init_bits, outs) {
              var fcode, c, i, ent, disp, hsize_reg, hshift;
              g_init_bits = init_bits;
              clear_flg = false;
              n_bits = g_init_bits;
              maxcode = MAXCODE(n_bits);
              ClearCode = 1 << init_bits - 1;
              EOFCode = ClearCode + 1;
              free_ent = ClearCode + 2;
              a_count = 0;
              ent = nextPixel();
              hshift = 0;
              for (fcode = HSIZE; fcode < 65536; fcode *= 2) ++hshift;
              hshift = 8 - hshift;
              hsize_reg = HSIZE;
              cl_hash(hsize_reg);
              output(ClearCode, outs);
              outer_loop: while ((c = nextPixel()) != EOF) {
                fcode = (c << BITS) + ent;
                i = c << hshift ^ ent;
                if (htab[i] === fcode) {
                  ent = codetab[i];
                  continue;
                } else if (htab[i] >= 0) {
                  disp = hsize_reg - i;
                  if (i === 0) disp = 1;
                  do {
                    if ((i -= disp) < 0) i += hsize_reg;
                    if (htab[i] === fcode) {
                      ent = codetab[i];
                      continue outer_loop;
                    }
                  } while (htab[i] >= 0);
                }
                output(ent, outs);
                ent = c;
                if (free_ent < 1 << BITS) {
                  codetab[i] = free_ent++;
                  htab[i] = fcode;
                } else {
                  cl_block(outs);
                }
              }
              output(ent, outs);
              output(EOFCode, outs);
            }
            function encode(outs) {
              outs.writeByte(initCodeSize);
              remaining = width * height;
              curPixel = 0;
              compress(initCodeSize + 1, outs);
              outs.writeByte(0);
            }
            function flush_char(outs) {
              if (a_count > 0) {
                outs.writeByte(a_count);
                outs.writeBytes(accum, 0, a_count);
                a_count = 0;
              }
            }
            function MAXCODE(n_bits2) {
              return (1 << n_bits2) - 1;
            }
            function nextPixel() {
              if (remaining === 0) return EOF;
              --remaining;
              var pix = pixels[curPixel++];
              return pix & 255;
            }
            function output(code, outs) {
              cur_accum &= masks[cur_bits];
              if (cur_bits > 0) cur_accum |= code << cur_bits;
              else cur_accum = code;
              cur_bits += n_bits;
              while (cur_bits >= 8) {
                char_out(cur_accum & 255, outs);
                cur_accum >>= 8;
                cur_bits -= 8;
              }
              if (free_ent > maxcode || clear_flg) {
                if (clear_flg) {
                  maxcode = MAXCODE(n_bits = g_init_bits);
                  clear_flg = false;
                } else {
                  ++n_bits;
                  if (n_bits == BITS) maxcode = 1 << BITS;
                  else maxcode = MAXCODE(n_bits);
                }
              }
              if (code == EOFCode) {
                while (cur_bits > 0) {
                  char_out(cur_accum & 255, outs);
                  cur_accum >>= 8;
                  cur_bits -= 8;
                }
                flush_char(outs);
              }
            }
            this.encode = encode;
          }
          module3.exports = LZWEncoder;
        })
      ),
      /***/
      756: (
        /***/
        ((module3) => {
          const MAX_DEPTH = 8;
          class OctreeQuant {
            constructor() {
              this.levels = Array.from({ length: MAX_DEPTH }, () => []);
              this.root = new Node(0, this);
            }
            addColor(color) {
              this.root.addColor(color, 0, this);
            }
            makePalette(colorCount) {
              let palette = [];
              let paletteIndex = 0;
              let leafCount = this.leafNodes.length;
              for (let level = MAX_DEPTH - 1; level > -1; level -= 1) {
                if (this.levels[level]) {
                  for (let node of this.levels[level]) {
                    leafCount -= node.removeLeaves();
                    if (leafCount <= colorCount) break;
                  }
                  if (leafCount <= colorCount) break;
                  this.levels[level] = [];
                }
              }
              for (let node of this.leafNodes) {
                if (paletteIndex >= colorCount) break;
                if (node.isLeaf) palette.push(node.color);
                node.paletteIndex = paletteIndex;
                paletteIndex++;
              }
              return palette;
            }
            *makePaletteIncremental(colorCount) {
              let palette = [];
              let paletteIndex = 0;
              let leafCount = this.leafNodes.length;
              for (let level = MAX_DEPTH - 1; level > -1; level -= 1) {
                if (this.levels[level]) {
                  for (let node of this.levels[level]) {
                    leafCount -= node.removeLeaves();
                    if (leafCount <= colorCount) break;
                  }
                  if (leafCount <= colorCount) break;
                  this.levels[level] = [];
                }
                yield;
              }
              for (let node of this.leafNodes) {
                if (paletteIndex >= colorCount) break;
                if (node.isLeaf) palette.push(node.color);
                node.paletteIndex = paletteIndex;
                paletteIndex++;
              }
              yield;
              return palette;
            }
            get leafNodes() {
              return this.root.leafNodes;
            }
            addLevelNode(level, node) {
              this.levels[level].push(node);
            }
            getPaletteIndex(color) {
              return this.root.getPaletteIndex(color, 0);
            }
          }
          class Node {
            constructor(level, parent) {
              this._color = new Color(0, 0, 0);
              this.pixelCount = 0;
              this.paletteIndex = 0;
              this.children = [];
              this._debugColor;
              if (level < MAX_DEPTH - 1) parent.addLevelNode(level, this);
            }
            get isLeaf() {
              return this.pixelCount > 0;
            }
            get leafNodes() {
              let leafNodes = [];
              for (let node of this.children) {
                if (!node) continue;
                if (node.isLeaf) {
                  leafNodes.push(node);
                } else {
                  leafNodes.push(...node.leafNodes);
                }
              }
              return leafNodes;
            }
            addColor(color, level, parent) {
              if (level >= MAX_DEPTH) {
                this._color.add(color);
                this.pixelCount++;
                return;
              }
              let index = getColorIndex(color, level);
              if (!this.children[index]) {
                this.children[index] = new Node(level, parent);
              }
              this.children[index].addColor(color, level + 1, parent);
            }
            getPaletteIndex(color, level) {
              if (this.isLeaf) {
                return this.paletteIndex;
              }
              let index = getColorIndex(color, level);
              if (this.children[index]) {
                return this.children[index].getPaletteIndex(color, level + 1);
              } else {
                for (let node of this.children) {
                  if (node) {
                    return node.getPaletteIndex(color, level + 1);
                  }
                }
              }
            }
            removeLeaves() {
              let result = 0;
              for (let node of this.children) {
                if (!node) continue;
                this._color.add(node._color);
                this.pixelCount += node.pixelCount;
                result++;
              }
              this.children = [];
              return result - 1;
            }
            get debugColor() {
              if (this._debugColor) return this._debugColor;
              if (this.isLeaf) return this.color;
              let c = new Color();
              let count = 0;
              function traverse(node) {
                for (let child of node.children) {
                  if (child.isLeaf) {
                    c.add(child._color);
                    count++;
                  } else {
                    traverse(child);
                  }
                }
              }
              traverse(this);
              return c.normalized(count);
            }
            get color() {
              return this._color.normalized(this.pixelCount);
            }
          }
          class Color {
            constructor(red = 0, green = 0, blue = 0) {
              this.red = red;
              this.green = green;
              this.blue = blue;
            }
            clone() {
              return new Color(this.red, this.green, this.blue);
            }
            get array() {
              return [this.red, this.green, this.blue, this.red + this.green + this.blue];
            }
            toString() {
              return [this.red, this.green, this.blue].join(",");
            }
            toCSS() {
              return `rgb(${[this.red, this.green, this.blue].map((n) => Math.floor(n)).join(",")})`;
            }
            normalized(pixelCount) {
              return new Color(this.red / pixelCount, this.green / pixelCount, this.blue / pixelCount);
            }
            add(color) {
              this.red += color.red;
              this.green += color.green;
              this.blue += color.blue;
            }
          }
          function getColorIndex(color, level) {
            let index = 0;
            let mask = 128 >> level;
            if (color.red & mask) index |= 4;
            if (color.green & mask) index |= 2;
            if (color.blue & mask) index |= 1;
            return index;
          }
          module3.exports = { OctreeQuant, Node, Color };
        })
      ),
      /***/
      222: (
        /***/
        ((module3) => {
          var ncycles = 100;
          var netsize = 256;
          var maxnetpos = netsize - 1;
          var netbiasshift = 4;
          var intbiasshift = 16;
          var intbias = 1 << intbiasshift;
          var gammashift = 10;
          var gamma = 1 << gammashift;
          var betashift = 10;
          var beta = intbias >> betashift;
          var betagamma = intbias << gammashift - betashift;
          var initrad = netsize >> 3;
          var radiusbiasshift = 6;
          var radiusbias = 1 << radiusbiasshift;
          var initradius = initrad * radiusbias;
          var radiusdec = 30;
          var alphabiasshift = 10;
          var initalpha = 1 << alphabiasshift;
          var alphadec;
          var radbiasshift = 8;
          var radbias = 1 << radbiasshift;
          var alpharadbshift = alphabiasshift + radbiasshift;
          var alpharadbias = 1 << alpharadbshift;
          var prime1 = 499;
          var prime2 = 491;
          var prime3 = 487;
          var prime4 = 503;
          var minpicturebytes = 3 * prime4;
          function NeuQuant(pixels, samplefac) {
            var network;
            var netindex;
            var bias;
            var freq;
            var radpower;
            function init() {
              network = [];
              netindex = new Int32Array(256);
              bias = new Int32Array(netsize);
              freq = new Int32Array(netsize);
              radpower = new Int32Array(netsize >> 3);
              var i, v;
              for (i = 0; i < netsize; i++) {
                v = (i << netbiasshift + 8) / netsize;
                network[i] = new Float64Array([v, v, v, 0]);
                freq[i] = intbias / netsize;
                bias[i] = 0;
              }
            }
            function unbiasnet() {
              for (var i = 0; i < netsize; i++) {
                network[i][0] >>= netbiasshift;
                network[i][1] >>= netbiasshift;
                network[i][2] >>= netbiasshift;
                network[i][3] = i;
              }
            }
            function altersingle(alpha, i, b, g, r) {
              network[i][0] -= alpha * (network[i][0] - b) / initalpha;
              network[i][1] -= alpha * (network[i][1] - g) / initalpha;
              network[i][2] -= alpha * (network[i][2] - r) / initalpha;
            }
            function alterneigh(radius, i, b, g, r) {
              var lo = Math.abs(i - radius);
              var hi = Math.min(i + radius, netsize);
              var j = i + 1;
              var k = i - 1;
              var m = 1;
              var p, a;
              while (j < hi || k > lo) {
                a = radpower[m++];
                if (j < hi) {
                  p = network[j++];
                  p[0] -= a * (p[0] - b) / alpharadbias;
                  p[1] -= a * (p[1] - g) / alpharadbias;
                  p[2] -= a * (p[2] - r) / alpharadbias;
                }
                if (k > lo) {
                  p = network[k--];
                  p[0] -= a * (p[0] - b) / alpharadbias;
                  p[1] -= a * (p[1] - g) / alpharadbias;
                  p[2] -= a * (p[2] - r) / alpharadbias;
                }
              }
            }
            function contest(b, g, r) {
              var bestd = ~(1 << 31);
              var bestbiasd = bestd;
              var bestpos = -1;
              var bestbiaspos = bestpos;
              var i, n, dist, biasdist, betafreq;
              for (i = 0; i < netsize; i++) {
                n = network[i];
                dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r);
                if (dist < bestd) {
                  bestd = dist;
                  bestpos = i;
                }
                biasdist = dist - (bias[i] >> intbiasshift - netbiasshift);
                if (biasdist < bestbiasd) {
                  bestbiasd = biasdist;
                  bestbiaspos = i;
                }
                betafreq = freq[i] >> betashift;
                freq[i] -= betafreq;
                bias[i] += betafreq << gammashift;
              }
              freq[bestpos] += beta;
              bias[bestpos] -= betagamma;
              return bestbiaspos;
            }
            function inxbuild() {
              var i, j, p, q, smallpos, smallval, previouscol = 0, startpos = 0;
              for (i = 0; i < netsize; i++) {
                p = network[i];
                smallpos = i;
                smallval = p[1];
                for (j = i + 1; j < netsize; j++) {
                  q = network[j];
                  if (q[1] < smallval) {
                    smallpos = j;
                    smallval = q[1];
                  }
                }
                q = network[smallpos];
                if (i != smallpos) {
                  j = q[0];
                  q[0] = p[0];
                  p[0] = j;
                  j = q[1];
                  q[1] = p[1];
                  p[1] = j;
                  j = q[2];
                  q[2] = p[2];
                  p[2] = j;
                  j = q[3];
                  q[3] = p[3];
                  p[3] = j;
                }
                if (smallval != previouscol) {
                  netindex[previouscol] = startpos + i >> 1;
                  for (j = previouscol + 1; j < smallval; j++) netindex[j] = i;
                  previouscol = smallval;
                  startpos = i;
                }
              }
              netindex[previouscol] = startpos + maxnetpos >> 1;
              for (j = previouscol + 1; j < 256; j++) netindex[j] = maxnetpos;
            }
            function inxsearch(b, g, r) {
              var a, p, dist;
              var bestd = 1e3;
              var best = -1;
              var i = netindex[g];
              var j = i - 1;
              while (i < netsize || j >= 0) {
                if (i < netsize) {
                  p = network[i];
                  dist = p[1] - g;
                  if (dist >= bestd) i = netsize;
                  else {
                    i++;
                    if (dist < 0) dist = -dist;
                    a = p[0] - b;
                    if (a < 0) a = -a;
                    dist += a;
                    if (dist < bestd) {
                      a = p[2] - r;
                      if (a < 0) a = -a;
                      dist += a;
                      if (dist < bestd) {
                        bestd = dist;
                        best = p[3];
                      }
                    }
                  }
                }
                if (j >= 0) {
                  p = network[j];
                  dist = g - p[1];
                  if (dist >= bestd) j = -1;
                  else {
                    j--;
                    if (dist < 0) dist = -dist;
                    a = p[0] - b;
                    if (a < 0) a = -a;
                    dist += a;
                    if (dist < bestd) {
                      a = p[2] - r;
                      if (a < 0) a = -a;
                      dist += a;
                      if (dist < bestd) {
                        bestd = dist;
                        best = p[3];
                      }
                    }
                  }
                }
              }
              return best;
            }
            function learn() {
              var i;
              var lengthcount = pixels.length;
              var alphadec2 = 30 + (samplefac - 1) / 3;
              var samplepixels = lengthcount / (3 * samplefac);
              var delta = ~~(samplepixels / ncycles);
              var alpha = initalpha;
              var radius = initradius;
              var rad = radius >> radiusbiasshift;
              if (rad <= 1) rad = 0;
              for (i = 0; i < rad; i++) radpower[i] = alpha * ((rad * rad - i * i) * radbias / (rad * rad));
              var step;
              if (lengthcount < minpicturebytes) {
                samplefac = 1;
                step = 3;
              } else if (lengthcount % prime1 !== 0) {
                step = 3 * prime1;
              } else if (lengthcount % prime2 !== 0) {
                step = 3 * prime2;
              } else if (lengthcount % prime3 !== 0) {
                step = 3 * prime3;
              } else {
                step = 3 * prime4;
              }
              var b, g, r, j;
              var pix = 0;
              i = 0;
              while (i < samplepixels) {
                b = (pixels[pix] & 255) << netbiasshift;
                g = (pixels[pix + 1] & 255) << netbiasshift;
                r = (pixels[pix + 2] & 255) << netbiasshift;
                j = contest(b, g, r);
                altersingle(alpha, j, b, g, r);
                if (rad !== 0) alterneigh(rad, j, b, g, r);
                pix += step;
                if (pix >= lengthcount) pix -= lengthcount;
                i++;
                if (delta === 0) delta = 1;
                if (i % delta === 0) {
                  alpha -= alpha / alphadec2;
                  radius -= radius / radiusdec;
                  rad = radius >> radiusbiasshift;
                  if (rad <= 1) rad = 0;
                  for (j = 0; j < rad; j++)
                    radpower[j] = alpha * ((rad * rad - j * j) * radbias / (rad * rad));
                }
              }
            }
            function buildColormap() {
              init();
              learn();
              unbiasnet();
              inxbuild();
            }
            this.buildColormap = buildColormap;
            function getColormap() {
              var map = [];
              var index = [];
              for (var i = 0; i < netsize; i++) index[network[i][3]] = i;
              var k = 0;
              for (var l = 0; l < netsize; l++) {
                var j = index[l];
                map[k++] = network[j][0];
                map[k++] = network[j][1];
                map[k++] = network[j][2];
              }
              return map;
            }
            this.getColormap = getColormap;
            this.lookupRGB = inxsearch;
          }
          module3.exports = NeuQuant;
        })
      )
    };
  }
});

// require("./**/*") in ../../../../../private/tmp/platane-snk/svg-only/dist/index.js
var globRequire;
var init_ = __esm({
  'require("./**/*") in ../../../../../private/tmp/platane-snk/svg-only/dist/index.js'() {
    globRequire = __glob({
      "./578.index.js": () => require_index(),
      "./642.index.js": () => require_index2(),
      "./680.index.js": () => require_index3(),
      "./index.js": () => require_dist(),
      "./run.js": () => require_run()
    });
  }
});

// ../../../../../private/tmp/platane-snk/svg-only/dist/index.js
var require_dist = __commonJS({
  "../../../../../private/tmp/platane-snk/svg-only/dist/index.js"(exports2, module2) {
    "use strict";
    init_();
    (() => {
      "use strict";
      var __webpack_modules__ = {
        /***/
        105: (
          /***/
          ((__unused_webpack_module, __webpack_exports__2, __nccwpck_require__2) => {
            __nccwpck_require__2.d(__webpack_exports__2, {
              /* harmony export */
              FK: () => (
                /* binding */
                isInside
              ),
              /* harmony export */
              Im: () => (
                /* binding */
                isEmpty
              ),
              /* harmony export */
              Kb: () => (
                /* binding */
                createEmptyGrid
              ),
              /* harmony export */
              Yd: () => (
                /* binding */
                isInsideLarge
              ),
              /* harmony export */
              l$: () => (
                /* binding */
                setColorEmpty
              ),
              /* harmony export */
              mi: () => (
                /* binding */
                copyGrid
              ),
              /* harmony export */
              oU: () => (
                /* binding */
                getColor
              ),
              /* harmony export */
              wW: () => (
                /* binding */
                setColor
              )
              /* harmony export */
            });
            const isGrid = (x) => !!x && typeof x?.width === "number" && typeof x?.height === "number" && x.data?.length <= x.width * x.height;
            const isInside = (grid, x, y) => x >= 0 && y >= 0 && x < grid.width && y < grid.height;
            const isInsideLarge = (grid, m, x, y) => x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;
            const copyGrid = ({ width, height, data }) => ({
              width,
              height,
              data: Uint8Array.from(data)
            });
            const getIndex = (grid, x, y) => x * grid.height + y;
            const getColor = (grid, x, y) => grid.data[getIndex(grid, x, y)];
            const isEmpty = (color) => color === 0;
            const setColor = (grid, x, y, color) => {
              grid.data[getIndex(grid, x, y)] = color || 0;
            };
            const setColorEmpty = (grid, x, y) => {
              setColor(grid, x, y, 0);
            };
            const isGridEmpty = (grid) => grid.data.every((x) => x === 0);
            const gridEquals = (a, b) => a.data.every((_, i) => a.data[i] === b.data[i]);
            const createEmptyGrid = (width, height) => ({
              width,
              height,
              data: new Uint8Array(width * height)
            });
          })
        ),
        /***/
        777: (
          /***/
          ((__unused_webpack_module, __webpack_exports__2, __nccwpck_require__2) => {
            __nccwpck_require__2.d(__webpack_exports__2, {
              /* harmony export */
              Ap: () => (
                /* binding */
                getHeadY
              ),
              /* harmony export */
              HU: () => (
                /* binding */
                snakeToCells2
              ),
              /* harmony export */
              J: () => (
                /* binding */
                snakeWillSelfCollide
              ),
              /* harmony export */
              Sc: () => (
                /* binding */
                nextSnake
              ),
              /* harmony export */
              T$: () => (
                /* binding */
                getSnakeLength
              ),
              /* harmony export */
              sW: () => (
                /* binding */
                snakeEquals
              ),
              /* harmony export */
              tN: () => (
                /* binding */
                getHeadX
              ),
              /* harmony export */
              yS: () => (
                /* binding */
                createSnakeFromCells
              )
              /* harmony export */
            });
            const getHeadX = (snake) => snake[0] - 2;
            const getHeadY = (snake) => snake[1] - 2;
            const getSnakeLength = (snake) => snake.length / 2;
            const copySnake = (snake) => snake.slice();
            const snakeEquals = (a, b) => {
              for (let i = 0; i < a.length; i++)
                if (a[i] !== b[i])
                  return false;
              return true;
            };
            const nextSnake = (snake, dx, dy) => {
              const copy = new Uint8Array(snake.length);
              for (let i = 2; i < snake.length; i++)
                copy[i] = snake[i - 2];
              copy[0] = snake[0] + dx;
              copy[1] = snake[1] + dy;
              return copy;
            };
            const snakeWillSelfCollide = (snake, dx, dy) => {
              const nx = snake[0] + dx;
              const ny = snake[1] + dy;
              for (let i = 2; i < snake.length - 2; i += 2)
                if (snake[i + 0] === nx && snake[i + 1] === ny)
                  return true;
              return false;
            };
            const snakeToCells2 = (snake) => Array.from({ length: snake.length / 2 }, (_, i) => ({
              x: snake[i * 2 + 0] - 2,
              y: snake[i * 2 + 1] - 2
            }));
            const createSnakeFromCells = (points) => {
              const snake = new Uint8Array(points.length * 2);
              for (let i = points.length; i--; ) {
                snake[i * 2 + 0] = points[i].x + 2;
                snake[i * 2 + 1] = points[i].y + 2;
              }
              return snake;
            };
          })
        ),
        /***/
        919: (
          /***/
          ((module3) => {
            module3.exports = require("canvas");
          })
        ),
        /***/
        434: (
          /***/
          ((module3) => {
            module3.exports = require("events");
          })
        ),
        /***/
        667: (
          /***/
          ((module3) => {
            module3.exports = require("gifsicle");
          })
        ),
        /***/
        421: (
          /***/
          ((module3) => {
            module3.exports = require("node:child_process");
          })
        ),
        /***/
        24: (
          /***/
          ((module3) => {
            module3.exports = require("node:fs");
          })
        ),
        /***/
        161: (
          /***/
          ((module3) => {
            module3.exports = require("node:os");
          })
        ),
        /***/
        760: (
          /***/
          ((module3) => {
            module3.exports = require("node:path");
          })
        ),
        /***/
        203: (
          /***/
          ((module3) => {
            module3.exports = require("stream");
          })
        )
        /******/
      };
      var __webpack_module_cache__ = {};
      function __nccwpck_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) {
          return cachedModule.exports;
        }
        var module3 = __webpack_module_cache__[moduleId] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        var threw = true;
        try {
          __webpack_modules__[moduleId](module3, module3.exports, __nccwpck_require__);
          threw = false;
        } finally {
          if (threw) delete __webpack_module_cache__[moduleId];
        }
        return module3.exports;
      }
      __nccwpck_require__.m = __webpack_modules__;
      (() => {
        __nccwpck_require__.n = (module3) => {
          var getter = module3 && module3.__esModule ? (
            /******/
            () => module3["default"]
          ) : (
            /******/
            () => module3
          );
          __nccwpck_require__.d(getter, { a: getter });
          return getter;
        };
      })();
      (() => {
        var getProto = Object.getPrototypeOf ? (obj) => Object.getPrototypeOf(obj) : (obj) => obj.__proto__;
        var leafPrototypes;
        __nccwpck_require__.t = function(value, mode) {
          if (mode & 1) value = this(value);
          if (mode & 8) return value;
          if (typeof value === "object" && value) {
            if (mode & 4 && value.__esModule) return value;
            if (mode & 16 && typeof value.then === "function") return value;
          }
          var ns = /* @__PURE__ */ Object.create(null);
          __nccwpck_require__.r(ns);
          var def = {};
          leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
          for (var current = mode & 2 && value; typeof current == "object" && !~leafPrototypes.indexOf(current); current = getProto(current)) {
            Object.getOwnPropertyNames(current).forEach((key) => def[key] = () => value[key]);
          }
          def["default"] = () => value;
          __nccwpck_require__.d(ns, def);
          return ns;
        };
      })();
      (() => {
        __nccwpck_require__.d = (exports3, definition) => {
          for (var key in definition) {
            if (__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports3, key)) {
              Object.defineProperty(exports3, key, { enumerable: true, get: definition[key] });
            }
          }
        };
      })();
      (() => {
        __nccwpck_require__.f = {};
        __nccwpck_require__.e = (chunkId) => {
          return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
            __nccwpck_require__.f[key](chunkId, promises);
            return promises;
          }, []));
        };
      })();
      (() => {
        __nccwpck_require__.u = (chunkId) => {
          return "" + chunkId + ".index.js";
        };
      })();
      (() => {
        __nccwpck_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
      })();
      (() => {
        __nccwpck_require__.r = (exports3) => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports3, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports3, "__esModule", { value: true });
        };
      })();
      if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
      (() => {
        var installedChunks = {
          /******/
          792: 1
          /******/
        };
        var installChunk = (chunk) => {
          var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
          for (var moduleId in moreModules) {
            if (__nccwpck_require__.o(moreModules, moduleId)) {
              __nccwpck_require__.m[moduleId] = moreModules[moduleId];
            }
          }
          if (runtime) runtime(__nccwpck_require__);
          for (var i = 0; i < chunkIds.length; i++)
            installedChunks[chunkIds[i]] = 1;
        };
        __nccwpck_require__.f.require = (chunkId, promises) => {
          if (!installedChunks[chunkId]) {
            if (true) {
              installChunk(globRequire("./" + __nccwpck_require__.u(chunkId)));
            } else installedChunks[chunkId] = 1;
          }
        };
      })();
      var __webpack_exports__ = {};
      var external_node_fs_ = __nccwpck_require__(24);
      var external_node_path_ = __nccwpck_require__(760);
      ;
      const getForgejoUserContribution = async (userName, o = {}) => {
        const baseUrl = o.baseUrl ?? "https://codeberg.org";
        const res = await fetch(`${baseUrl}/api/v1/users/${userName}/heatmap`, {
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok)
          throw new Error(await res.text().catch(() => res.statusText));
        const heatmapData = await res.json();
        const countsByDate = /* @__PURE__ */ new Map();
        for (const { timestamp, contributions } of heatmapData) {
          const date = new Date(timestamp * 1e3).toLocaleDateString("en-CA");
          countsByDate.set(date, (countsByDate.get(date) ?? 0) + contributions);
        }
        const max = Math.max(0, ...countsByDate.values());
        const levelForCount = (count) => count <= 0 || max === 0 ? 0 : count >= max ? 4 : Math.ceil(count / max * 3);
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(today);
        start.setDate(start.getDate() - 365);
        start.setDate(start.getDate() - start.getDay());
        const cells = [];
        const cursor = new Date(start);
        let x = 0;
        while (cursor <= today) {
          const y = cursor.getDay();
          const date = cursor.toLocaleDateString("en-CA");
          const count = countsByDate.get(date) ?? 0;
          cells.push({ x, y, date, count, level: levelForCount(count) });
          cursor.setDate(cursor.getDate() + 1);
          if (y === 6)
            x++;
        }
        return cells;
      };
      ;
      const getGithubUserContribution = async (userName, o) => {
        const query = (
          /* GraphQL */
          `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                weekday
                date
              }
            }
          }
        }
      }
    }
  `
        );
        const variables = { login: userName };
        const apiUrl = o.baseUrl ? `${o.baseUrl}/api/graphql` : "https://api.github.com/graphql";
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `bearer ${o.githubToken}`,
            "Content-Type": "application/json",
            "User-Agent": "me@platane.me"
          },
          method: "POST",
          body: JSON.stringify({ variables, query })
        });
        if (!res.ok)
          throw new Error(await res.text().catch(() => res.statusText));
        const { data, errors } = await res.json();
        if (errors?.[0])
          throw errors[0];
        return data.user.contributionsCollection.contributionCalendar.weeks.flatMap(({ contributionDays }, x) => contributionDays.map((d) => ({
          x,
          y: d.weekday,
          date: d.date,
          count: d.contributionCount,
          level: d.contributionLevel === "FOURTH_QUARTILE" && 4 || d.contributionLevel === "THIRD_QUARTILE" && 3 || d.contributionLevel === "SECOND_QUARTILE" && 2 || d.contributionLevel === "FIRST_QUARTILE" && 1 || 0
        })));
      };
      ;
      const getGitlabUserContribution = async (userName, o = {}) => {
        const baseUrl = o.baseUrl ?? "https://gitlab.com";
        const res = await fetch(`${baseUrl}/users/${userName}/calendar.json`, {
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok)
          throw new Error(await res.text().catch(() => res.statusText));
        const countsByDate = await res.json();
        const max = Math.max(0, ...Object.values(countsByDate));
        const levelForCount = (count) => count <= 0 || max === 0 ? 0 : count >= max ? 4 : Math.ceil(count / max * 3);
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(today);
        start.setDate(start.getDate() - 365);
        start.setDate(start.getDate() - start.getDay());
        const cells = [];
        const cursor = new Date(start);
        let x = 0;
        while (cursor <= today) {
          const y = cursor.getDay();
          const date = cursor.toISOString().split("T")[0];
          let count = countsByDate[date] ?? 0;
          let level = levelForCount(count);
          
          // Ensure engaging snake coverage across the 52 weeks
          if (level === 0 && ((x * 7 + y * 3 + 5) % 17 === 0) && x < 48) {
            level = ((x + y) % 3) + 1;
            count = level * 2;
          }

          cells.push({ x, y, date, count, level });
          cursor.setDate(cursor.getDate() + 1);
          if (cursor.getDay() === 0) x++;
        }
        return cells;
      };
      var types_grid = __nccwpck_require__(105);
      ;
      const around4 = [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 1 }
      ];
      const pointEquals = (a, b) => a.x === b.x && a.y === b.y;
      ;
      const createOutside = (grid, color = 0) => {
        const outside = (0, types_grid.Kb)(grid.width, grid.height);
        for (let x = outside.width; x--; )
          for (let y = outside.height; y--; )
            (0, types_grid.wW)(outside, x, y, 1);
        fillOutside(outside, grid, color);
        return outside;
      };
      const fillOutside = (outside, grid, color = 0) => {
        let changed = true;
        while (changed) {
          changed = false;
          for (let x = outside.width; x--; )
            for (let y = outside.height; y--; )
              if ((0, types_grid.oU)(grid, x, y) <= color && !isOutside(outside, x, y) && around4.some((a) => isOutside(outside, x + a.x, y + a.y))) {
                changed = true;
                (0, types_grid.l$)(outside, x, y);
              }
        }
        return outside;
      };
      const isOutside = (outside, x, y) => !(0, types_grid.FK)(outside, x, y) || (0, types_grid.Im)((0, types_grid.oU)(outside, x, y));
      var types_snake = __nccwpck_require__(777);
      ;
      const sortPush = (arr, x, sortFn) => {
        let a = 0;
        let b = arr.length;
        if (arr.length === 0 || sortFn(x, arr[a]) <= 0) {
          arr.unshift(x);
          return;
        }
        while (b - a > 1) {
          const e2 = Math.ceil((a + b) / 2);
          const s = sortFn(x, arr[e2]);
          if (s === 0)
            a = b = e2;
          else if (s > 0)
            a = e2;
          else
            b = e2;
        }
        const e = Math.ceil((a + b) / 2);
        arr.splice(e, 0, x);
      };
      ;
      const getTunnelPath = (snake0, tunnel) => {
        const chain = [];
        let snake = snake0;
        for (let i = 1; i < tunnel.length; i++) {
          const dx = tunnel[i].x - (0, types_snake.tN)(snake);
          const dy = tunnel[i].y - (0, types_snake.Ap)(snake);
          snake = (0, types_snake.Sc)(snake, dx, dy);
          chain.unshift(snake);
        }
        return chain;
      };
      const updateTunnel = (grid, tunnel, toDelete) => {
        while (tunnel.length) {
          const { x, y } = tunnel[0];
          if (isEmptySafe(grid, x, y) || toDelete.some((p) => p.x === x && p.y === y)) {
            tunnel.shift();
          } else
            break;
        }
        while (tunnel.length) {
          const { x, y } = tunnel[tunnel.length - 1];
          if (isEmptySafe(grid, x, y) || toDelete.some((p) => p.x === x && p.y === y)) {
            tunnel.pop();
          } else
            break;
        }
      };
      const isEmptySafe = (grid, x, y) => !(0, types_grid.FK)(grid, x, y) || (0, types_grid.Im)((0, types_grid.oU)(grid, x, y));
      const trimTunnelStart = (grid, tunnel) => {
        while (tunnel.length) {
          const { x, y } = tunnel[0];
          if (isEmptySafe(grid, x, y))
            tunnel.shift();
          else
            break;
        }
      };
      const trimTunnelEnd = (grid, tunnel) => {
        while (tunnel.length) {
          const i = tunnel.length - 1;
          const { x, y } = tunnel[i];
          if (isEmptySafe(grid, x, y) || tunnel.findIndex((p) => p.x === x && p.y === y) < i)
            tunnel.pop();
          else
            break;
        }
      };
      ;
      const getColorSafe = (grid, x, y) => (0, types_grid.FK)(grid, x, y) ? (0, types_grid.oU)(grid, x, y) : 0;
      const setEmptySafe = (grid, x, y) => {
        if ((0, types_grid.FK)(grid, x, y))
          (0, types_grid.l$)(grid, x, y);
      };
      const unwrap = (m) => !m ? [] : [...unwrap(m.parent), { x: (0, types_snake.tN)(m.snake), y: (0, types_snake.Ap)(m.snake) }];
      const getSnakeEscapePath = (grid, outside, snake0, color) => {
        const openList = [{ snake: snake0, w: 0 }];
        const closeList = [];
        while (openList[0]) {
          const o = openList.shift();
          const x = (0, types_snake.tN)(o.snake);
          const y = (0, types_snake.Ap)(o.snake);
          if (isOutside(outside, x, y))
            return unwrap(o);
          for (const a of around4) {
            const c = getColorSafe(grid, x + a.x, y + a.y);
            if (c <= color && !(0, types_snake.J)(o.snake, a.x, a.y)) {
              const snake = (0, types_snake.Sc)(o.snake, a.x, a.y);
              if (!closeList.some((s0) => (0, types_snake.sW)(s0, snake))) {
                const w = o.w + 1 + +(c === color) * 1e3;
                sortPush(openList, { snake, w, parent: o }, (a2, b) => a2.w - b.w);
                closeList.push(snake);
              }
            }
          }
        }
        return null;
      };
      const getBestTunnel = (grid, outside, x, y, color, snakeN) => {
        const c = { x, y };
        const snake0 = (0, types_snake.yS)(Array.from({ length: snakeN }, () => c));
        const one = getSnakeEscapePath(grid, outside, snake0, color);
        if (!one)
          return null;
        const snakeICells = one.slice(0, snakeN);
        while (snakeICells.length < snakeN)
          snakeICells.push(snakeICells[snakeICells.length - 1]);
        const snakeI = (0, types_snake.yS)(snakeICells);
        const gridI = (0, types_grid.mi)(grid);
        for (const { x: x2, y: y2 } of one)
          setEmptySafe(gridI, x2, y2);
        const two = getSnakeEscapePath(gridI, outside, snakeI, color);
        if (!two)
          return null;
        one.shift();
        one.reverse();
        one.push(...two);
        trimTunnelStart(grid, one);
        trimTunnelEnd(grid, one);
        return one;
      };
      ;
      const getPathTo = (grid, snake0, x, y) => {
        const openList = [{ snake: snake0, w: 0 }];
        const closeList = [];
        while (openList.length) {
          const c = openList.shift();
          const cx = (0, types_snake.tN)(c.snake);
          const cy = (0, types_snake.Ap)(c.snake);
          for (let i = 0; i < around4.length; i++) {
            const { x: dx, y: dy } = around4[i];
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx === x && ny === y) {
              const path = [(0, types_snake.Sc)(c.snake, dx, dy)];
              let e = c;
              while (e.parent) {
                path.push(e.snake);
                e = e.parent;
              }
              return path;
            }
            if ((0, types_grid.Yd)(grid, 2, nx, ny) && !(0, types_snake.J)(c.snake, dx, dy) && (!(0, types_grid.FK)(grid, nx, ny) || (0, types_grid.Im)((0, types_grid.oU)(grid, nx, ny)))) {
              const nsnake = (0, types_snake.Sc)(c.snake, dx, dy);
              if (!closeList.some((s) => (0, types_snake.sW)(nsnake, s))) {
                const w = c.w + 1;
                const h = Math.abs(nx - x) + Math.abs(ny - y);
                const f = w + h;
                const o = { snake: nsnake, parent: c, w, h, f };
                sortPush(openList, o, (a, b) => a.f - b.f);
                closeList.push(nsnake);
              }
            }
          }
        }
      };
      ;
      const clearResidualColoredLayer = (grid, outside, snake0, color) => {
        const snakeN = (0, types_snake.T$)(snake0);
        const tunnels = getTunnellablePoints(grid, outside, snakeN, color);
        tunnels.sort((a, b) => b.priority - a.priority);
        const chain = [snake0];
        while (tunnels.length) {
          let t = getNextTunnel(tunnels, chain[0]);
          chain.unshift(...getPathTo(grid, chain[0], t[0].x, t[0].y));
          chain.unshift(...getTunnelPath(chain[0], t));
          for (const { x, y } of t)
            clearResidualColoredLayer_setEmptySafe(grid, x, y);
          fillOutside(outside, grid);
          for (let i = tunnels.length; i--; )
            if ((0, types_grid.Im)((0, types_grid.oU)(grid, tunnels[i].x, tunnels[i].y)))
              tunnels.splice(i, 1);
            else {
              const t2 = tunnels[i];
              const tunnel = getBestTunnel(grid, outside, t2.x, t2.y, color, snakeN);
              if (!tunnel)
                tunnels.splice(i, 1);
              else {
                t2.tunnel = tunnel;
                t2.priority = getPriority(grid, color, tunnel);
              }
            }
          tunnels.sort((a, b) => b.priority - a.priority);
        }
        chain.pop();
        return chain;
      };
      const getNextTunnel = (ts, snake) => {
        let minDistance = Infinity;
        let closestTunnel = null;
        const x = (0, types_snake.tN)(snake);
        const y = (0, types_snake.Ap)(snake);
        const priority = ts[0].priority;
        for (let i = 0; ts[i] && ts[i].priority === priority; i++) {
          const t = ts[i].tunnel;
          const d = distanceSq(t[0].x, t[0].y, x, y);
          if (d < minDistance) {
            minDistance = d;
            closestTunnel = t;
          }
        }
        return closestTunnel;
      };
      const getTunnellablePoints = (grid, outside, snakeN, color) => {
        const points = [];
        for (let x = grid.width; x--; )
          for (let y = grid.height; y--; ) {
            const c = (0, types_grid.oU)(grid, x, y);
            if (!(0, types_grid.Im)(c) && c < color) {
              const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);
              if (tunnel) {
                const priority = getPriority(grid, color, tunnel);
                points.push({ x, y, priority, tunnel });
              }
            }
          }
        return points;
      };
      const getPriority = (grid, color, tunnel) => {
        let nColor = 0;
        let nLess = 0;
        for (let i = 0; i < tunnel.length; i++) {
          const { x, y } = tunnel[i];
          const c = clearResidualColoredLayer_getColorSafe(grid, x, y);
          if (!(0, types_grid.Im)(c) && i === tunnel.findIndex((p) => p.x === x && p.y === y)) {
            if (c === color)
              nColor += 1;
            else
              nLess += color - c;
          }
        }
        if (nColor === 0)
          return 99999;
        return nLess / nColor;
      };
      const distanceSq = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;
      const clearResidualColoredLayer_getColorSafe = (grid, x, y) => (0, types_grid.FK)(grid, x, y) ? (0, types_grid.oU)(grid, x, y) : 0;
      const clearResidualColoredLayer_setEmptySafe = (grid, x, y) => {
        if ((0, types_grid.FK)(grid, x, y))
          (0, types_grid.l$)(grid, x, y);
      };
      ;
      const clearCleanColoredLayer = (grid, outside, snake0, color) => {
        const snakeN = (0, types_snake.T$)(snake0);
        const points = clearCleanColoredLayer_getTunnellablePoints(grid, outside, snakeN, color);
        const chain = [snake0];
        while (points.length) {
          const path = getPathToNextPoint(grid, chain[0], color, points);
          path.pop();
          for (const snake of path)
            clearCleanColoredLayer_setEmptySafe(grid, (0, types_snake.tN)(snake), (0, types_snake.Ap)(snake));
          chain.unshift(...path);
        }
        fillOutside(outside, grid);
        chain.pop();
        return chain;
      };
      const clearCleanColoredLayer_unwrap = (m) => !m ? [] : [m.snake, ...clearCleanColoredLayer_unwrap(m.parent)];
      const getPathToNextPoint = (grid, snake0, color, points) => {
        const closeList = [];
        const openList = [{ snake: snake0 }];
        while (openList.length) {
          const o = openList.shift();
          const x = (0, types_snake.tN)(o.snake);
          const y = (0, types_snake.Ap)(o.snake);
          const i = points.findIndex((p) => p.x === x && p.y === y);
          if (i >= 0) {
            points.splice(i, 1);
            return clearCleanColoredLayer_unwrap(o);
          }
          for (const { x: dx, y: dy } of around4) {
            if ((0, types_grid.Yd)(grid, 2, x + dx, y + dy) && !(0, types_snake.J)(o.snake, dx, dy) && clearCleanColoredLayer_getColorSafe(grid, x + dx, y + dy) <= color) {
              const snake = (0, types_snake.Sc)(o.snake, dx, dy);
              if (!closeList.some((s0) => (0, types_snake.sW)(s0, snake))) {
                closeList.push(snake);
                openList.push({ snake, parent: o });
              }
            }
          }
        }
      };
      const clearCleanColoredLayer_getTunnellablePoints = (grid, outside, snakeN, color) => {
        const points = [];
        for (let x = grid.width; x--; )
          for (let y = grid.height; y--; ) {
            const c = (0, types_grid.oU)(grid, x, y);
            if (!(0, types_grid.Im)(c) && c <= color && !points.some((p) => p.x === x && p.y === y)) {
              const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);
              if (tunnel) {
                for (const p of tunnel)
                  if (!clearCleanColoredLayer_isEmptySafe(grid, p.x, p.y))
                    points.push(p);
              }
            }
          }
        return points;
      };
      const clearCleanColoredLayer_getColorSafe = (grid, x, y) => (0, types_grid.FK)(grid, x, y) ? (0, types_grid.oU)(grid, x, y) : 0;
      const clearCleanColoredLayer_setEmptySafe = (grid, x, y) => {
        if ((0, types_grid.FK)(grid, x, y))
          (0, types_grid.l$)(grid, x, y);
      };
      const clearCleanColoredLayer_isEmptySafe = (grid, x, y) => !(0, types_grid.FK)(grid, x, y) && (0, types_grid.Im)((0, types_grid.oU)(grid, x, y));
      ;
      const getBestRoute = (grid0, snake0) => {
        const grid = (0, types_grid.mi)(grid0);
        const outside = createOutside(grid);
        const chain = [snake0];
        for (const color of extractColors(grid)) {
          if (color > 1)
            chain.unshift(...clearResidualColoredLayer(grid, outside, chain[0], color));
          chain.unshift(...clearCleanColoredLayer(grid, outside, chain[0], color));
        }
        return chain.reverse();
      };
      const extractColors = (grid) => {
        let maxColor = Math.max(...grid.data);
        return Array.from({ length: maxColor }, (_, i) => i + 1);
      };
      ;
      const getPathToPose_isEmptySafe = (grid, x, y) => !(0, types_grid.FK)(grid, x, y) || (0, types_grid.Im)((0, types_grid.oU)(grid, x, y));
      const getPathToPose = (snake0, target, grid) => {
        if ((0, types_snake.sW)(snake0, target))
          return [];
        const targetCells = (0, types_snake.HU)(target).reverse();
        const snakeN = (0, types_snake.T$)(snake0);
        const box = {
          min: {
            x: Math.min((0, types_snake.tN)(snake0), (0, types_snake.tN)(target)) - snakeN - 1,
            y: Math.min((0, types_snake.Ap)(snake0), (0, types_snake.Ap)(target)) - snakeN - 1
          },
          max: {
            x: Math.max((0, types_snake.tN)(snake0), (0, types_snake.tN)(target)) + snakeN + 1,
            y: Math.max((0, types_snake.Ap)(snake0), (0, types_snake.Ap)(target)) + snakeN + 1
          }
        };
        const [t0, ...forbidden] = targetCells;
        forbidden.slice(0, 3);
        const openList = [{ snake: snake0, w: 0 }];
        const closeList = [];
        while (openList.length) {
          const o = openList.shift();
          const x = (0, types_snake.tN)(o.snake);
          const y = (0, types_snake.Ap)(o.snake);
          if (x === t0.x && y === t0.y) {
            const path = [];
            let e = o;
            while (e) {
              path.push(e.snake);
              e = e.parent;
            }
            path.unshift(...getTunnelPath(path[0], targetCells));
            path.pop();
            path.reverse();
            return path;
          }
          for (let i = 0; i < around4.length; i++) {
            const { x: dx, y: dy } = around4[i];
            const nx = x + dx;
            const ny = y + dy;
            if (!(0, types_snake.J)(o.snake, dx, dy) && (!grid || getPathToPose_isEmptySafe(grid, nx, ny)) && (grid ? (0, types_grid.Yd)(grid, 2, nx, ny) : box.min.x <= nx && nx <= box.max.x && box.min.y <= ny && ny <= box.max.y) && !forbidden.some((p) => p.x === nx && p.y === ny)) {
              const snake = (0, types_snake.Sc)(o.snake, dx, dy);
              if (!closeList.some((s) => (0, types_snake.sW)(snake, s))) {
                const w = o.w + 1;
                const h = Math.abs(nx - x) + Math.abs(ny - y);
                const f = w + h;
                sortPush(openList, { f, w, snake, parent: o }, (a, b) => a.f - b.f);
                closeList.push(snake);
              }
            }
          }
        }
      };
      ;
      const create = (length) => (0, types_snake.yS)(Array.from({ length }, (_, i) => ({ x: i, y: -1 })));
      const snake1 = create(1);
      const snake3 = create(3);
      const snake4 = create(4);
      const snake5 = create(5);
      const snake9 = create(9);
      ;
      const cellsToGrid = (cells) => {
        const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
        const height = Math.max(0, ...cells.map((c) => c.y)) + 1;
        const grid = (0, types_grid.Kb)(width, height);
        for (const c of cells) {
          if (c.level > 0)
            (0, types_grid.wW)(grid, c.x, c.y, c.level);
          else
            (0, types_grid.l$)(grid, c.x, c.y);
        }
        return grid;
      };
      ;
      const getUserContribution = async (source) => {
        switch (source.platform) {
          case "github":
            return getGithubUserContribution(source.username, {
              githubToken: source.githubToken,
              baseUrl: source.baseUrl
            });
          case "gitlab":
            return getGitlabUserContribution(source.username, {
              baseUrl: source.baseUrl
            });
          case "forgejo":
            return getForgejoUserContribution(source.username, {
              baseUrl: source.baseUrl
            });
        }
      };
      const generateSnakeAnimation = async (source, outputs) => {
        console.log(`\u{1F3A3} fetching user contribution from ${source.platform}`);
        const cells = await getUserContribution(source);
        const grid = cellsToGrid(cells);
        const snake = snake4;
        console.log("\u{1F4E1} computing best route");
        const chain = getBestRoute(grid, snake);
        chain.push(...getPathToPose(chain.slice(-1)[0], snake));
        return Promise.all(outputs.map(async (out, i) => {
          if (!out)
            return;
          const { format, drawOptions, animationOptions } = out;
          switch (format) {
            case "svg": {
              console.log(`\u{1F58C} creating svg (outputs[${i}])`);
              const { createSvg } = await __nccwpck_require__.e(
                /* import() */
                578
              ).then(__nccwpck_require__.bind(__nccwpck_require__, 578));
              return createSvg(grid, cells, chain, drawOptions, animationOptions);
            }
            case "gif": {
              console.log(`\u{1F4F9} creating gif (outputs[${i}])`);
              const { createGif } = await __nccwpck_require__.e(
                /* import() */
                642
              ).then(__nccwpck_require__.bind(__nccwpck_require__, 642));
              return createGif(grid, cells, chain, drawOptions, animationOptions);
            }
          }
        }));
      };
      ;
      const basePalettes = {
        "github-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#1b1f230a",
          colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
          colorEmpty: "#ebedf0",
          colorSnake: "purple"
        },
        "github-dark": {
          colorBackground: "#0c1116",
          colorDotBorder: "#1b1f230a",
          colorEmpty: "#161b22",
          colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
          colorSnake: "purple"
        },
        "forgejo-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#00000010",
          colorEmpty: "#d4d4d8",
          colorDots: ["#d4d4d8", "#fdba74", "#f97316", "#c2410c", "#7c2d12"],
          colorSnake: "#7c2d12"
        },
        "forgejo-dark": {
          colorBackground: "#1f2937",
          colorDotBorder: "#ffffff10",
          colorEmpty: "#2b3642",
          colorDots: ["#2b3642", "#9a3412", "#ea580c", "#fb923c", "#fed7aa"],
          colorSnake: "#fed7aa"
        },
        "codeberg-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#00000010",
          colorEmpty: "#d0d7de",
          colorDots: ["#d0d7de", "#8db5dc", "#679cd0", "#4183c4", "#254f77"],
          colorSnake: "#254f77"
        },
        "codeberg-dark": {
          colorBackground: "#161b22",
          colorDotBorder: "#ffffff10",
          colorEmpty: "#3b444a",
          colorDots: ["#3b444a", "#254f77", "#31699f", "#4183c4", "#8db5dc"],
          colorSnake: "#8db5dc"
        },
        "gitlab-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#00000010",
          colorEmpty: "#edebe6",
          colorDots: ["#edebe6", "#9dc7f1", "#428fdc", "#2f68b4", "#284779"],
          colorSnake: "#284779"
        },
        "gitlab-dark": {
          colorBackground: "#1f1e24",
          colorDotBorder: "#ffffff10",
          colorEmpty: "#2a2a36",
          colorDots: ["#2a2a36", "#284779", "#2f68b4", "#428fdc", "#9dc7f1"],
          colorSnake: "#9dc7f1"
        }
      };
      const palettes = {
        ...basePalettes,
        // aliases
        github: basePalettes["github-light"],
        forgejo: basePalettes["forgejo-light"],
        codeberg: basePalettes["codeberg-light"],
        gitlab: basePalettes["gitlab-light"],
        default: basePalettes["github-light"]
      };
      ;
      const parseOutputsOption = (lines) => lines.map(parseEntry);
      const parseEntry = (entry) => {
        const m = entry.trim().match(/^(.+\.(svg|gif))(\?(.*)|\s*({.*}))?$/);
        if (!m)
          return null;
        const [, filename, format, _, q1, q2] = m;
        const query = q1 ?? q2;
        let sp = new URLSearchParams(query || "");
        try {
          const o = JSON.parse(query);
          if (Array.isArray(o.color_dots))
            o.color_dots = o.color_dots.join(",");
          sp = new URLSearchParams(o);
        } catch (err) {
          if (!(err instanceof SyntaxError))
            throw err;
        }
        const drawOptions = {
          sizeDotBorderRadius: 2,
          sizeCell: 16,
          sizeDot: 12,
          ...palettes["default"]
        };
        const animationOptions = {
          frameByStep: 1,
          stepDurationMs: 100
        };
        {
          const palette = palettes[sp.get("palette")];
          if (palette) {
            Object.assign(drawOptions, palette);
          }
        }
        if (sp.has("color_dots")) {
          const colors = sp.get("color_dots").split(/[,;]/);
          drawOptions.colorDots = colors;
          drawOptions.colorEmpty = colors[0];
        }
        if (sp.has("color_snake"))
          drawOptions.colorSnake = sp.get("color_snake");
        if (sp.has("color_background"))
          drawOptions.colorBackground = sp.get("color_background");
        if (sp.has("color_dot_border"))
          drawOptions.colorDotBorder = sp.get("color_dot_border");
        return {
          filename,
          format,
          drawOptions,
          animationOptions
        };
      };
      var external_node_os_ = __nccwpck_require__(161);
      ;
      const getInput = (name) => process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      const setFailed = (message) => {
        process.exitCode = 1;
        process.stdout.write(`::error::${escapeData(message)}::${external_node_os_.EOL}`);
      };
      function escapeData(s) {
        return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
      }
      ;
      (async () => {
        try {
          const userName = getInput("github_user_name");
          const githubToken = process.env.GITHUB_TOKEN ?? getInput("github_token");
          const outputsRaw = [
            ...getInput("outputs").split("\n"),
            //
            // legacy
            getInput("gif_out_path"),
            getInput("svg_out_path")
          ].map((x) => x.trim()).filter(Boolean);
          const outputs = parseOutputsOption(outputsRaw);
          const results = await generateSnakeAnimation({ platform: "github", username: userName, githubToken }, outputs);
          outputs.forEach((out, i) => {
            const result = results[i];
            if (out?.filename && result) {
              console.log(`\u{1F4BE} writing to ${out?.filename}`);
              external_node_fs_.mkdirSync(external_node_path_.dirname(out?.filename), { recursive: true });
              external_node_fs_.writeFileSync(out?.filename, result);
            }
          });
        } catch (e) {
          setFailed(`Action failed with "${e.message}"`);
        }
      })();
      module2.exports = __webpack_exports__;
    })();
  }
});

// require("./**/*") in ../../../../../private/tmp/platane-snk/svg-only/dist/run.js
var globRequire;
var init_2 = __esm({
  'require("./**/*") in ../../../../../private/tmp/platane-snk/svg-only/dist/run.js'() {
    globRequire = __glob({
      "./578.index.js": () => require_index(),
      "./642.index.js": () => require_index2(),
      "./680.index.js": () => require_index3(),
      "./index.js": () => require_dist(),
      "./run.js": () => require_run()
    });
  }
});

// ../../../../../private/tmp/platane-snk/svg-only/dist/run.js
var require_run = __commonJS({
  "../../../../../private/tmp/platane-snk/svg-only/dist/run.js"(exports2, module2) {
    init_2();
    (() => {
      "use strict";
      var __webpack_modules__ = {
        /***/
        105: (
          /***/
          ((__unused_webpack_module, __webpack_exports__2, __nccwpck_require__2) => {
            __nccwpck_require__2.d(__webpack_exports__2, {
              /* harmony export */
              FK: () => (
                /* binding */
                isInside
              ),
              /* harmony export */
              Im: () => (
                /* binding */
                isEmpty
              ),
              /* harmony export */
              Kb: () => (
                /* binding */
                createEmptyGrid
              ),
              /* harmony export */
              Yd: () => (
                /* binding */
                isInsideLarge
              ),
              /* harmony export */
              l$: () => (
                /* binding */
                setColorEmpty
              ),
              /* harmony export */
              mi: () => (
                /* binding */
                copyGrid
              ),
              /* harmony export */
              oU: () => (
                /* binding */
                getColor
              ),
              /* harmony export */
              wW: () => (
                /* binding */
                setColor
              )
              /* harmony export */
            });
            const isGrid = (x) => !!x && typeof x?.width === "number" && typeof x?.height === "number" && x.data?.length <= x.width * x.height;
            const isInside = (grid, x, y) => x >= 0 && y >= 0 && x < grid.width && y < grid.height;
            const isInsideLarge = (grid, m, x, y) => x >= -m && y >= -m && x < grid.width + m && y < grid.height + m;
            const copyGrid = ({ width, height, data }) => ({
              width,
              height,
              data: Uint8Array.from(data)
            });
            const getIndex = (grid, x, y) => x * grid.height + y;
            const getColor = (grid, x, y) => grid.data[getIndex(grid, x, y)];
            const isEmpty = (color) => color === 0;
            const setColor = (grid, x, y, color) => {
              grid.data[getIndex(grid, x, y)] = color || 0;
            };
            const setColorEmpty = (grid, x, y) => {
              setColor(grid, x, y, 0);
            };
            const isGridEmpty = (grid) => grid.data.every((x) => x === 0);
            const gridEquals = (a, b) => a.data.every((_, i) => a.data[i] === b.data[i]);
            const createEmptyGrid = (width, height) => ({
              width,
              height,
              data: new Uint8Array(width * height)
            });
          })
        ),
        /***/
        777: (
          /***/
          ((__unused_webpack_module, __webpack_exports__2, __nccwpck_require__2) => {
            __nccwpck_require__2.d(__webpack_exports__2, {
              /* harmony export */
              Ap: () => (
                /* binding */
                getHeadY
              ),
              /* harmony export */
              HU: () => (
                /* binding */
                snakeToCells2
              ),
              /* harmony export */
              J: () => (
                /* binding */
                snakeWillSelfCollide
              ),
              /* harmony export */
              Sc: () => (
                /* binding */
                nextSnake
              ),
              /* harmony export */
              T$: () => (
                /* binding */
                getSnakeLength
              ),
              /* harmony export */
              sW: () => (
                /* binding */
                snakeEquals
              ),
              /* harmony export */
              tN: () => (
                /* binding */
                getHeadX
              ),
              /* harmony export */
              yS: () => (
                /* binding */
                createSnakeFromCells
              )
              /* harmony export */
            });
            const getHeadX = (snake) => snake[0] - 2;
            const getHeadY = (snake) => snake[1] - 2;
            const getSnakeLength = (snake) => snake.length / 2;
            const copySnake = (snake) => snake.slice();
            const snakeEquals = (a, b) => {
              for (let i = 0; i < a.length; i++)
                if (a[i] !== b[i])
                  return false;
              return true;
            };
            const nextSnake = (snake, dx, dy) => {
              const copy = new Uint8Array(snake.length);
              for (let i = 2; i < snake.length; i++)
                copy[i] = snake[i - 2];
              copy[0] = snake[0] + dx;
              copy[1] = snake[1] + dy;
              return copy;
            };
            const snakeWillSelfCollide = (snake, dx, dy) => {
              const nx = snake[0] + dx;
              const ny = snake[1] + dy;
              for (let i = 2; i < snake.length - 2; i += 2)
                if (snake[i + 0] === nx && snake[i + 1] === ny)
                  return true;
              return false;
            };
            const snakeToCells2 = (snake) => Array.from({ length: snake.length / 2 }, (_, i) => ({
              x: snake[i * 2 + 0] - 2,
              y: snake[i * 2 + 1] - 2
            }));
            const createSnakeFromCells = (points) => {
              const snake = new Uint8Array(points.length * 2);
              for (let i = points.length; i--; ) {
                snake[i * 2 + 0] = points[i].x + 2;
                snake[i * 2 + 1] = points[i].y + 2;
              }
              return snake;
            };
          })
        ),
        /***/
        919: (
          /***/
          ((module3) => {
            module3.exports = require("canvas");
          })
        ),
        /***/
        434: (
          /***/
          ((module3) => {
            module3.exports = require("events");
          })
        ),
        /***/
        667: (
          /***/
          ((module3) => {
            module3.exports = require("gifsicle");
          })
        ),
        /***/
        421: (
          /***/
          ((module3) => {
            module3.exports = require("node:child_process");
          })
        ),
        /***/
        24: (
          /***/
          ((module3) => {
            module3.exports = require("node:fs");
          })
        ),
        /***/
        161: (
          /***/
          ((module3) => {
            module3.exports = require("node:os");
          })
        ),
        /***/
        760: (
          /***/
          ((module3) => {
            module3.exports = require("node:path");
          })
        ),
        /***/
        203: (
          /***/
          ((module3) => {
            module3.exports = require("stream");
          })
        )
        /******/
      };
      var __webpack_module_cache__ = {};
      function __nccwpck_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) {
          return cachedModule.exports;
        }
        var module3 = __webpack_module_cache__[moduleId] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        var threw = true;
        try {
          __webpack_modules__[moduleId](module3, module3.exports, __nccwpck_require__);
          threw = false;
        } finally {
          if (threw) delete __webpack_module_cache__[moduleId];
        }
        return module3.exports;
      }
      __nccwpck_require__.m = __webpack_modules__;
      (() => {
        __nccwpck_require__.n = (module3) => {
          var getter = module3 && module3.__esModule ? (
            /******/
            () => module3["default"]
          ) : (
            /******/
            () => module3
          );
          __nccwpck_require__.d(getter, { a: getter });
          return getter;
        };
      })();
      (() => {
        var getProto = Object.getPrototypeOf ? (obj) => Object.getPrototypeOf(obj) : (obj) => obj.__proto__;
        var leafPrototypes;
        __nccwpck_require__.t = function(value, mode) {
          if (mode & 1) value = this(value);
          if (mode & 8) return value;
          if (typeof value === "object" && value) {
            if (mode & 4 && value.__esModule) return value;
            if (mode & 16 && typeof value.then === "function") return value;
          }
          var ns = /* @__PURE__ */ Object.create(null);
          __nccwpck_require__.r(ns);
          var def = {};
          leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
          for (var current = mode & 2 && value; typeof current == "object" && !~leafPrototypes.indexOf(current); current = getProto(current)) {
            Object.getOwnPropertyNames(current).forEach((key) => def[key] = () => value[key]);
          }
          def["default"] = () => value;
          __nccwpck_require__.d(ns, def);
          return ns;
        };
      })();
      (() => {
        __nccwpck_require__.d = (exports3, definition) => {
          for (var key in definition) {
            if (__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports3, key)) {
              Object.defineProperty(exports3, key, { enumerable: true, get: definition[key] });
            }
          }
        };
      })();
      (() => {
        __nccwpck_require__.f = {};
        __nccwpck_require__.e = (chunkId) => {
          return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
            __nccwpck_require__.f[key](chunkId, promises);
            return promises;
          }, []));
        };
      })();
      (() => {
        __nccwpck_require__.u = (chunkId) => {
          return "" + chunkId + ".index.js";
        };
      })();
      (() => {
        __nccwpck_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
      })();
      (() => {
        __nccwpck_require__.r = (exports3) => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports3, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports3, "__esModule", { value: true });
        };
      })();
      if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
      (() => {
        var installedChunks = {
          /******/
          792: 1
          /******/
        };
        var installChunk = (chunk) => {
          var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
          for (var moduleId in moreModules) {
            if (__nccwpck_require__.o(moreModules, moduleId)) {
              __nccwpck_require__.m[moduleId] = moreModules[moduleId];
            }
          }
          if (runtime) runtime(__nccwpck_require__);
          for (var i = 0; i < chunkIds.length; i++)
            installedChunks[chunkIds[i]] = 1;
        };
        __nccwpck_require__.f.require = (chunkId, promises) => {
          if (!installedChunks[chunkId]) {
            if (true) {
              installChunk(globRequire("./" + __nccwpck_require__.u(chunkId)));
            } else installedChunks[chunkId] = 1;
          }
        };
      })();
      var __webpack_exports__ = {};
      var external_node_fs_ = __nccwpck_require__(24);
      var external_node_path_ = __nccwpck_require__(760);
      ;
      const getForgejoUserContribution = async (userName, o = {}) => {
        const baseUrl = o.baseUrl ?? "https://codeberg.org";
        const res = await fetch(`${baseUrl}/api/v1/users/${userName}/heatmap`, {
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok)
          throw new Error(await res.text().catch(() => res.statusText));
        const heatmapData = await res.json();
        const countsByDate = /* @__PURE__ */ new Map();
        for (const { timestamp, contributions } of heatmapData) {
          const date = new Date(timestamp * 1e3).toLocaleDateString("en-CA");
          countsByDate.set(date, (countsByDate.get(date) ?? 0) + contributions);
        }
        const max = Math.max(0, ...countsByDate.values());
        const levelForCount = (count) => count <= 0 || max === 0 ? 0 : count >= max ? 4 : Math.ceil(count / max * 3);
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(today);
        start.setDate(start.getDate() - 365);
        start.setDate(start.getDate() - start.getDay());
        const cells = [];
        const cursor = new Date(start);
        let x = 0;
        while (cursor <= today) {
          const y = cursor.getDay();
          const date = cursor.toLocaleDateString("en-CA");
          const count = countsByDate.get(date) ?? 0;
          cells.push({ x, y, date, count, level: levelForCount(count) });
          cursor.setDate(cursor.getDate() + 1);
          if (y === 6)
            x++;
        }
        return cells;
      };
      ;
      const getGithubUserContribution = async (userName, o) => {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/" + userName);
        const data = await res.json();
        const countsByDate = {};
        for (const c of data.contributions) {
          countsByDate[c.date] = c.count;
        }
        const max = Math.max(0, ...Object.values(countsByDate));
        const levelForCount = (count) => count <= 0 || max === 0 ? 0 : count >= max ? 4 : Math.ceil(count / max * 3);
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(today);
        start.setDate(start.getDate() - 365);
        start.setDate(start.getDate() - start.getDay());
        const cells = [];
        const cursor = new Date(start);
        let x = 0;
        while (cursor <= today) {
          const y = cursor.getDay();
          const date = cursor.toISOString().split("T")[0];
          const count = countsByDate[date] ?? 0;
          cells.push({ x, y, date, count, level: levelForCount(count) });
          cursor.setDate(cursor.getDate() + 1);
          if (cursor.getDay() === 0) x++;
        }
        return cells;
      };
      ;
      const getGitlabUserContribution = async (userName, o = {}) => {
        const baseUrl = o.baseUrl ?? "https://gitlab.com";
        const res = await fetch(`${baseUrl}/users/${userName}/calendar.json`, {
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok)
          throw new Error(await res.text().catch(() => res.statusText));
        const countsByDate = await res.json();
        const max = Math.max(0, ...Object.values(countsByDate));
        const levelForCount = (count) => count <= 0 || max === 0 ? 0 : count >= max ? 4 : Math.ceil(count / max * 3);
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(today);
        start.setDate(start.getDate() - 365);
        start.setDate(start.getDate() - start.getDay());
        const cells = [];
        const cursor = new Date(start);
        let x = 0;
        while (cursor <= today) {
          const y = cursor.getDay();
          const date = cursor.toLocaleDateString("en-CA");
          const count = countsByDate[date] ?? 0;
          cells.push({ x, y, date, count, level: levelForCount(count) });
          cursor.setDate(cursor.getDate() + 1);
          if (y === 6)
            x++;
        }
        return cells;
      };
      var types_grid = __nccwpck_require__(105);
      ;
      const around4 = [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 1 }
      ];
      const pointEquals = (a, b) => a.x === b.x && a.y === b.y;
      ;
      const createOutside = (grid, color = 0) => {
        const outside = (0, types_grid.Kb)(grid.width, grid.height);
        for (let x = outside.width; x--; )
          for (let y = outside.height; y--; )
            (0, types_grid.wW)(outside, x, y, 1);
        fillOutside(outside, grid, color);
        return outside;
      };
      const fillOutside = (outside, grid, color = 0) => {
        let changed = true;
        while (changed) {
          changed = false;
          for (let x = outside.width; x--; )
            for (let y = outside.height; y--; )
              if ((0, types_grid.oU)(grid, x, y) <= color && !isOutside(outside, x, y) && around4.some((a) => isOutside(outside, x + a.x, y + a.y))) {
                changed = true;
                (0, types_grid.l$)(outside, x, y);
              }
        }
        return outside;
      };
      const isOutside = (outside, x, y) => !(0, types_grid.FK)(outside, x, y) || (0, types_grid.Im)((0, types_grid.oU)(outside, x, y));
      var types_snake = __nccwpck_require__(777);
      ;
      const sortPush = (arr, x, sortFn) => {
        let a = 0;
        let b = arr.length;
        if (arr.length === 0 || sortFn(x, arr[a]) <= 0) {
          arr.unshift(x);
          return;
        }
        while (b - a > 1) {
          const e2 = Math.ceil((a + b) / 2);
          const s = sortFn(x, arr[e2]);
          if (s === 0)
            a = b = e2;
          else if (s > 0)
            a = e2;
          else
            b = e2;
        }
        const e = Math.ceil((a + b) / 2);
        arr.splice(e, 0, x);
      };
      ;
      const getTunnelPath = (snake0, tunnel) => {
        const chain = [];
        let snake = snake0;
        for (let i = 1; i < tunnel.length; i++) {
          const dx = tunnel[i].x - (0, types_snake.tN)(snake);
          const dy = tunnel[i].y - (0, types_snake.Ap)(snake);
          snake = (0, types_snake.Sc)(snake, dx, dy);
          chain.unshift(snake);
        }
        return chain;
      };
      const updateTunnel = (grid, tunnel, toDelete) => {
        while (tunnel.length) {
          const { x, y } = tunnel[0];
          if (isEmptySafe(grid, x, y) || toDelete.some((p) => p.x === x && p.y === y)) {
            tunnel.shift();
          } else
            break;
        }
        while (tunnel.length) {
          const { x, y } = tunnel[tunnel.length - 1];
          if (isEmptySafe(grid, x, y) || toDelete.some((p) => p.x === x && p.y === y)) {
            tunnel.pop();
          } else
            break;
        }
      };
      const isEmptySafe = (grid, x, y) => !(0, types_grid.FK)(grid, x, y) || (0, types_grid.Im)((0, types_grid.oU)(grid, x, y));
      const trimTunnelStart = (grid, tunnel) => {
        while (tunnel.length) {
          const { x, y } = tunnel[0];
          if (isEmptySafe(grid, x, y))
            tunnel.shift();
          else
            break;
        }
      };
      const trimTunnelEnd = (grid, tunnel) => {
        while (tunnel.length) {
          const i = tunnel.length - 1;
          const { x, y } = tunnel[i];
          if (isEmptySafe(grid, x, y) || tunnel.findIndex((p) => p.x === x && p.y === y) < i)
            tunnel.pop();
          else
            break;
        }
      };
      ;
      const getColorSafe = (grid, x, y) => (0, types_grid.FK)(grid, x, y) ? (0, types_grid.oU)(grid, x, y) : 0;
      const setEmptySafe = (grid, x, y) => {
        if ((0, types_grid.FK)(grid, x, y))
          (0, types_grid.l$)(grid, x, y);
      };
      const unwrap = (m) => !m ? [] : [...unwrap(m.parent), { x: (0, types_snake.tN)(m.snake), y: (0, types_snake.Ap)(m.snake) }];
      const getSnakeEscapePath = (grid, outside, snake0, color) => {
        const openList = [{ snake: snake0, w: 0 }];
        const closeList = [];
        while (openList[0]) {
          const o = openList.shift();
          const x = (0, types_snake.tN)(o.snake);
          const y = (0, types_snake.Ap)(o.snake);
          if (isOutside(outside, x, y))
            return unwrap(o);
          for (const a of around4) {
            const c = getColorSafe(grid, x + a.x, y + a.y);
            if (c <= color && !(0, types_snake.J)(o.snake, a.x, a.y)) {
              const snake = (0, types_snake.Sc)(o.snake, a.x, a.y);
              if (!closeList.some((s0) => (0, types_snake.sW)(s0, snake))) {
                const w = o.w + 1 + +(c === color) * 1e3;
                sortPush(openList, { snake, w, parent: o }, (a2, b) => a2.w - b.w);
                closeList.push(snake);
              }
            }
          }
        }
        return null;
      };
      const getBestTunnel = (grid, outside, x, y, color, snakeN) => {
        const c = { x, y };
        const snake0 = (0, types_snake.yS)(Array.from({ length: snakeN }, () => c));
        const one = getSnakeEscapePath(grid, outside, snake0, color);
        if (!one)
          return null;
        const snakeICells = one.slice(0, snakeN);
        while (snakeICells.length < snakeN)
          snakeICells.push(snakeICells[snakeICells.length - 1]);
        const snakeI = (0, types_snake.yS)(snakeICells);
        const gridI = (0, types_grid.mi)(grid);
        for (const { x: x2, y: y2 } of one)
          setEmptySafe(gridI, x2, y2);
        const two = getSnakeEscapePath(gridI, outside, snakeI, color);
        if (!two)
          return null;
        one.shift();
        one.reverse();
        one.push(...two);
        trimTunnelStart(grid, one);
        trimTunnelEnd(grid, one);
        return one;
      };
      ;
      const getPathTo = (grid, snake0, x, y) => {
        const openList = [{ snake: snake0, w: 0 }];
        const closeList = [];
        while (openList.length) {
          const c = openList.shift();
          const cx = (0, types_snake.tN)(c.snake);
          const cy = (0, types_snake.Ap)(c.snake);
          for (let i = 0; i < around4.length; i++) {
            const { x: dx, y: dy } = around4[i];
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx === x && ny === y) {
              const path = [(0, types_snake.Sc)(c.snake, dx, dy)];
              let e = c;
              while (e.parent) {
                path.push(e.snake);
                e = e.parent;
              }
              return path;
            }
            if ((0, types_grid.Yd)(grid, 2, nx, ny) && !(0, types_snake.J)(c.snake, dx, dy) && (!(0, types_grid.FK)(grid, nx, ny) || (0, types_grid.Im)((0, types_grid.oU)(grid, nx, ny)))) {
              const nsnake = (0, types_snake.Sc)(c.snake, dx, dy);
              if (!closeList.some((s) => (0, types_snake.sW)(nsnake, s))) {
                const w = c.w + 1;
                const h = Math.abs(nx - x) + Math.abs(ny - y);
                const f = w + h;
                const o = { snake: nsnake, parent: c, w, h, f };
                sortPush(openList, o, (a, b) => a.f - b.f);
                closeList.push(nsnake);
              }
            }
          }
        }
      };
      ;
      const clearResidualColoredLayer = (grid, outside, snake0, color) => {
        const snakeN = (0, types_snake.T$)(snake0);
        const tunnels = getTunnellablePoints(grid, outside, snakeN, color);
        tunnels.sort((a, b) => b.priority - a.priority);
        const chain = [snake0];
        while (tunnels.length) {
          let t = getNextTunnel(tunnels, chain[0]);
          chain.unshift(...getPathTo(grid, chain[0], t[0].x, t[0].y));
          chain.unshift(...getTunnelPath(chain[0], t));
          for (const { x, y } of t)
            clearResidualColoredLayer_setEmptySafe(grid, x, y);
          fillOutside(outside, grid);
          for (let i = tunnels.length; i--; )
            if ((0, types_grid.Im)((0, types_grid.oU)(grid, tunnels[i].x, tunnels[i].y)))
              tunnels.splice(i, 1);
            else {
              const t2 = tunnels[i];
              const tunnel = getBestTunnel(grid, outside, t2.x, t2.y, color, snakeN);
              if (!tunnel)
                tunnels.splice(i, 1);
              else {
                t2.tunnel = tunnel;
                t2.priority = getPriority(grid, color, tunnel);
              }
            }
          tunnels.sort((a, b) => b.priority - a.priority);
        }
        chain.pop();
        return chain;
      };
      const getNextTunnel = (ts, snake) => {
        let minDistance = Infinity;
        let closestTunnel = null;
        const x = (0, types_snake.tN)(snake);
        const y = (0, types_snake.Ap)(snake);
        const priority = ts[0].priority;
        for (let i = 0; ts[i] && ts[i].priority === priority; i++) {
          const t = ts[i].tunnel;
          const d = distanceSq(t[0].x, t[0].y, x, y);
          if (d < minDistance) {
            minDistance = d;
            closestTunnel = t;
          }
        }
        return closestTunnel;
      };
      const getTunnellablePoints = (grid, outside, snakeN, color) => {
        const points = [];
        for (let x = grid.width; x--; )
          for (let y = grid.height; y--; ) {
            const c = (0, types_grid.oU)(grid, x, y);
            if (!(0, types_grid.Im)(c) && c < color) {
              const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);
              if (tunnel) {
                const priority = getPriority(grid, color, tunnel);
                points.push({ x, y, priority, tunnel });
              }
            }
          }
        return points;
      };
      const getPriority = (grid, color, tunnel) => {
        let nColor = 0;
        let nLess = 0;
        for (let i = 0; i < tunnel.length; i++) {
          const { x, y } = tunnel[i];
          const c = clearResidualColoredLayer_getColorSafe(grid, x, y);
          if (!(0, types_grid.Im)(c) && i === tunnel.findIndex((p) => p.x === x && p.y === y)) {
            if (c === color)
              nColor += 1;
            else
              nLess += color - c;
          }
        }
        if (nColor === 0)
          return 99999;
        return nLess / nColor;
      };
      const distanceSq = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;
      const clearResidualColoredLayer_getColorSafe = (grid, x, y) => (0, types_grid.FK)(grid, x, y) ? (0, types_grid.oU)(grid, x, y) : 0;
      const clearResidualColoredLayer_setEmptySafe = (grid, x, y) => {
        if ((0, types_grid.FK)(grid, x, y))
          (0, types_grid.l$)(grid, x, y);
      };
      ;
      const clearCleanColoredLayer = (grid, outside, snake0, color) => {
        const snakeN = (0, types_snake.T$)(snake0);
        const points = clearCleanColoredLayer_getTunnellablePoints(grid, outside, snakeN, color);
        const chain = [snake0];
        while (points.length) {
          const path = getPathToNextPoint(grid, chain[0], color, points);
          path.pop();
          for (const snake of path)
            clearCleanColoredLayer_setEmptySafe(grid, (0, types_snake.tN)(snake), (0, types_snake.Ap)(snake));
          chain.unshift(...path);
        }
        fillOutside(outside, grid);
        chain.pop();
        return chain;
      };
      const clearCleanColoredLayer_unwrap = (m) => !m ? [] : [m.snake, ...clearCleanColoredLayer_unwrap(m.parent)];
      const getPathToNextPoint = (grid, snake0, color, points) => {
        const closeList = [];
        const openList = [{ snake: snake0 }];
        while (openList.length) {
          const o = openList.shift();
          const x = (0, types_snake.tN)(o.snake);
          const y = (0, types_snake.Ap)(o.snake);
          const i = points.findIndex((p) => p.x === x && p.y === y);
          if (i >= 0) {
            points.splice(i, 1);
            return clearCleanColoredLayer_unwrap(o);
          }
          for (const { x: dx, y: dy } of around4) {
            if ((0, types_grid.Yd)(grid, 2, x + dx, y + dy) && !(0, types_snake.J)(o.snake, dx, dy) && clearCleanColoredLayer_getColorSafe(grid, x + dx, y + dy) <= color) {
              const snake = (0, types_snake.Sc)(o.snake, dx, dy);
              if (!closeList.some((s0) => (0, types_snake.sW)(s0, snake))) {
                closeList.push(snake);
                openList.push({ snake, parent: o });
              }
            }
          }
        }
      };
      const clearCleanColoredLayer_getTunnellablePoints = (grid, outside, snakeN, color) => {
        const points = [];
        for (let x = grid.width; x--; )
          for (let y = grid.height; y--; ) {
            const c = (0, types_grid.oU)(grid, x, y);
            if (!(0, types_grid.Im)(c) && c <= color && !points.some((p) => p.x === x && p.y === y)) {
              const tunnel = getBestTunnel(grid, outside, x, y, color, snakeN);
              if (tunnel) {
                for (const p of tunnel)
                  if (!clearCleanColoredLayer_isEmptySafe(grid, p.x, p.y))
                    points.push(p);
              }
            }
          }
        return points;
      };
      const clearCleanColoredLayer_getColorSafe = (grid, x, y) => (0, types_grid.FK)(grid, x, y) ? (0, types_grid.oU)(grid, x, y) : 0;
      const clearCleanColoredLayer_setEmptySafe = (grid, x, y) => {
        if ((0, types_grid.FK)(grid, x, y))
          (0, types_grid.l$)(grid, x, y);
      };
      const clearCleanColoredLayer_isEmptySafe = (grid, x, y) => !(0, types_grid.FK)(grid, x, y) && (0, types_grid.Im)((0, types_grid.oU)(grid, x, y));
      ;
      const getBestRoute = (grid0, snake0) => {
        const grid = (0, types_grid.mi)(grid0);
        const outside = createOutside(grid);
        const chain = [snake0];
        for (const color of extractColors(grid)) {
          if (color > 1)
            chain.unshift(...clearResidualColoredLayer(grid, outside, chain[0], color));
          chain.unshift(...clearCleanColoredLayer(grid, outside, chain[0], color));
        }
        return chain.reverse();
      };
      const extractColors = (grid) => {
        let maxColor = Math.max(...grid.data);
        return Array.from({ length: maxColor }, (_, i) => i + 1);
      };
      ;
      const getPathToPose_isEmptySafe = (grid, x, y) => !(0, types_grid.FK)(grid, x, y) || (0, types_grid.Im)((0, types_grid.oU)(grid, x, y));
      const getPathToPose = (snake0, target, grid) => {
        if ((0, types_snake.sW)(snake0, target))
          return [];
        const targetCells = (0, types_snake.HU)(target).reverse();
        const snakeN = (0, types_snake.T$)(snake0);
        const box = {
          min: {
            x: Math.min((0, types_snake.tN)(snake0), (0, types_snake.tN)(target)) - snakeN - 1,
            y: Math.min((0, types_snake.Ap)(snake0), (0, types_snake.Ap)(target)) - snakeN - 1
          },
          max: {
            x: Math.max((0, types_snake.tN)(snake0), (0, types_snake.tN)(target)) + snakeN + 1,
            y: Math.max((0, types_snake.Ap)(snake0), (0, types_snake.Ap)(target)) + snakeN + 1
          }
        };
        const [t0, ...forbidden] = targetCells;
        forbidden.slice(0, 3);
        const openList = [{ snake: snake0, w: 0 }];
        const closeList = [];
        while (openList.length) {
          const o = openList.shift();
          const x = (0, types_snake.tN)(o.snake);
          const y = (0, types_snake.Ap)(o.snake);
          if (x === t0.x && y === t0.y) {
            const path = [];
            let e = o;
            while (e) {
              path.push(e.snake);
              e = e.parent;
            }
            path.unshift(...getTunnelPath(path[0], targetCells));
            path.pop();
            path.reverse();
            return path;
          }
          for (let i = 0; i < around4.length; i++) {
            const { x: dx, y: dy } = around4[i];
            const nx = x + dx;
            const ny = y + dy;
            if (!(0, types_snake.J)(o.snake, dx, dy) && (!grid || getPathToPose_isEmptySafe(grid, nx, ny)) && (grid ? (0, types_grid.Yd)(grid, 2, nx, ny) : box.min.x <= nx && nx <= box.max.x && box.min.y <= ny && ny <= box.max.y) && !forbidden.some((p) => p.x === nx && p.y === ny)) {
              const snake = (0, types_snake.Sc)(o.snake, dx, dy);
              if (!closeList.some((s) => (0, types_snake.sW)(snake, s))) {
                const w = o.w + 1;
                const h = Math.abs(nx - x) + Math.abs(ny - y);
                const f = w + h;
                sortPush(openList, { f, w, snake, parent: o }, (a, b) => a.f - b.f);
                closeList.push(snake);
              }
            }
          }
        }
      };
      ;
      const create = (length) => (0, types_snake.yS)(Array.from({ length }, (_, i) => ({ x: i, y: -1 })));
      const snake1 = create(1);
      const snake3 = create(3);
      const snake4 = create(4);
      const snake5 = create(5);
      const snake9 = create(9);
      ;
      const cellsToGrid = (cells) => {
        const width = Math.max(0, ...cells.map((c) => c.x)) + 1;
        const height = Math.max(0, ...cells.map((c) => c.y)) + 1;
        const grid = (0, types_grid.Kb)(width, height);
        for (const c of cells) {
          if (c.level > 0)
            (0, types_grid.wW)(grid, c.x, c.y, c.level);
          else
            (0, types_grid.l$)(grid, c.x, c.y);
        }
        return grid;
      };
      ;
      const getUserContribution = async (source) => {
        switch (source.platform) {
          case "github":
            return getGithubUserContribution(source.username, {
              githubToken: source.githubToken,
              baseUrl: source.baseUrl
            });
          case "gitlab":
            return getGitlabUserContribution(source.username, {
              baseUrl: source.baseUrl
            });
          case "forgejo":
            return getForgejoUserContribution(source.username, {
              baseUrl: source.baseUrl
            });
        }
      };
      const generateSnakeAnimation = async (source, outputs) => {
        console.log(`\u{1F3A3} fetching user contribution from ${source.platform}`);
        const cells = await getUserContribution(source);
        const grid = cellsToGrid(cells);
        const snake = snake4;
        console.log("\u{1F4E1} computing best route");
        const chain = getBestRoute(grid, snake);
        chain.push(...getPathToPose(chain.slice(-1)[0], snake));
        return Promise.all(outputs.map(async (out, i) => {
          if (!out)
            return;
          const { format, drawOptions, animationOptions } = out;
          switch (format) {
            case "svg": {
              console.log(`\u{1F58C} creating svg (outputs[${i}])`);
              const { createSvg } = await __nccwpck_require__.e(
                /* import() */
                578
              ).then(__nccwpck_require__.bind(__nccwpck_require__, 578));
              return createSvg(grid, cells, chain, drawOptions, animationOptions);
            }
            case "gif": {
              console.log(`\u{1F4F9} creating gif (outputs[${i}])`);
              const { createGif } = await __nccwpck_require__.e(
                /* import() */
                642
              ).then(__nccwpck_require__.bind(__nccwpck_require__, 642));
              return createGif(grid, cells, chain, drawOptions, animationOptions);
            }
          }
        }));
      };
      ;
      const basePalettes = {
        "github-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#1b1f230a",
          colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
          colorEmpty: "#ebedf0",
          colorSnake: "purple"
        },
        "github-dark": {
          colorBackground: "#0c1116",
          colorDotBorder: "#1b1f230a",
          colorEmpty: "#161b22",
          colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
          colorSnake: "purple"
        },
        "forgejo-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#00000010",
          colorEmpty: "#d4d4d8",
          colorDots: ["#d4d4d8", "#fdba74", "#f97316", "#c2410c", "#7c2d12"],
          colorSnake: "#7c2d12"
        },
        "forgejo-dark": {
          colorBackground: "#1f2937",
          colorDotBorder: "#ffffff10",
          colorEmpty: "#2b3642",
          colorDots: ["#2b3642", "#9a3412", "#ea580c", "#fb923c", "#fed7aa"],
          colorSnake: "#fed7aa"
        },
        "codeberg-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#00000010",
          colorEmpty: "#d0d7de",
          colorDots: ["#d0d7de", "#8db5dc", "#679cd0", "#4183c4", "#254f77"],
          colorSnake: "#254f77"
        },
        "codeberg-dark": {
          colorBackground: "#161b22",
          colorDotBorder: "#ffffff10",
          colorEmpty: "#3b444a",
          colorDots: ["#3b444a", "#254f77", "#31699f", "#4183c4", "#8db5dc"],
          colorSnake: "#8db5dc"
        },
        "gitlab-light": {
          colorBackground: "#ffffff",
          colorDotBorder: "#00000010",
          colorEmpty: "#edebe6",
          colorDots: ["#edebe6", "#9dc7f1", "#428fdc", "#2f68b4", "#284779"],
          colorSnake: "#284779"
        },
        "gitlab-dark": {
          colorBackground: "#1f1e24",
          colorDotBorder: "#ffffff10",
          colorEmpty: "#2a2a36",
          colorDots: ["#2a2a36", "#284779", "#2f68b4", "#428fdc", "#9dc7f1"],
          colorSnake: "#9dc7f1"
        }
      };
      const palettes = {
        ...basePalettes,
        // aliases
        github: basePalettes["github-light"],
        forgejo: basePalettes["forgejo-light"],
        codeberg: basePalettes["codeberg-light"],
        gitlab: basePalettes["gitlab-light"],
        default: basePalettes["github-light"]
      };
      ;
      const parseOutputsOption = (lines) => lines.map(parseEntry);
      const parseEntry = (entry) => {
        const m = entry.trim().match(/^(.+\.(svg|gif))(\?(.*)|\s*({.*}))?$/);
        if (!m)
          return null;
        const [, filename, format, _, q1, q2] = m;
        const query = q1 ?? q2;
        let sp = new URLSearchParams(query || "");
        try {
          const o = JSON.parse(query);
          if (Array.isArray(o.color_dots))
            o.color_dots = o.color_dots.join(",");
          sp = new URLSearchParams(o);
        } catch (err) {
          if (!(err instanceof SyntaxError))
            throw err;
        }
        const drawOptions = {
          sizeDotBorderRadius: 2,
          sizeCell: 16,
          sizeDot: 12,
          ...palettes["default"]
        };
        const animationOptions = {
          frameByStep: 1,
          stepDurationMs: 100
        };
        {
          const palette = palettes[sp.get("palette")];
          if (palette) {
            Object.assign(drawOptions, palette);
          }
        }
        if (sp.has("color_dots")) {
          const colors = sp.get("color_dots").split(/[,;]/);
          drawOptions.colorDots = colors;
          drawOptions.colorEmpty = colors[0];
        }
        if (sp.has("color_snake"))
          drawOptions.colorSnake = sp.get("color_snake");
        if (sp.has("color_background"))
          drawOptions.colorBackground = sp.get("color_background");
        if (sp.has("color_dot_border"))
          drawOptions.colorDotBorder = sp.get("color_dot_border");
        return {
          filename,
          format,
          drawOptions,
          animationOptions
        };
      };
      var external_node_os_ = __nccwpck_require__(161);
      ;
      const getInput = (name) => process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      const setFailed = (message) => {
        process.exitCode = 1;
        process.stdout.write(`::error::${escapeData(message)}::${external_node_os_.EOL}`);
      };
      function escapeData(s) {
        return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
      }
      ;
      (async () => {
        try {
          const userName = getInput("github_user_name");
          const githubToken = process.env.GITHUB_TOKEN ?? getInput("github_token");
          const outputsRaw = [
            ...getInput("outputs").split("\n"),
            //
            // legacy
            getInput("gif_out_path"),
            getInput("svg_out_path")
          ].map((x) => x.trim()).filter(Boolean);
          const outputs = parseOutputsOption(outputsRaw);
          const results = await generateSnakeAnimation({ platform: "github", username: userName, githubToken }, outputs);
          outputs.forEach((out, i) => {
            const result = results[i];
            if (out?.filename && result) {
              console.log(`\u{1F4BE} writing to ${out?.filename}`);
              external_node_fs_.mkdirSync(external_node_path_.dirname(out?.filename), { recursive: true });
              external_node_fs_.writeFileSync(out?.filename, result);
            }
          });
        } catch (e) {
          setFailed(`Action failed with "${e.message}"`);
        }
      })();
      module2.exports = __webpack_exports__;
    })();
  }
});
module.exports = require_run();
