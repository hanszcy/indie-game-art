// The static map is painted once at its native pixel resolution.
const art = document.body.dataset.edition === "lantern";
const canvas = document.querySelector("#map"),
  ctx = canvas.getContext("2d");
const terrain = document.createElement("canvas");
terrain.width = 384;
terrain.height = 228;
const pen = terrain.getContext("2d");
function rect(c, x, y, w, h, ink) {
  c.fillStyle = ink;
  c.fillRect(Math.round(x), Math.round(y), w, h);
}
function poly(c, points, ink) {
  c.fillStyle = ink;
  c.beginPath();
  points.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
  c.closePath();
  c.fill();
}
function line(c, points, color, width = 1) {
  c.strokeStyle = color;
  c.lineWidth = width;
  c.beginPath();
  points.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
  c.stroke();
}
function oval(c, x, y, rx, ry, ink) {
  c.fillStyle = ink;
  c.beginPath();
  c.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
  c.fill();
}
function noise(i) {
  const n = Math.sin(i * 132.17 + 18.7) * 43289.73;
  return n - Math.floor(n);
}
const land = [
  [10, 115],
  [26, 99],
  [44, 90],
  [47, 66],
  [59, 51],
  [74, 47],
  [86, 35],
  [112, 28],
  [125, 18],
  [151, 18],
  [166, 29],
  [188, 33],
  [199, 53],
  [189, 68],
  [198, 79],
  [194, 94],
  [207, 99],
  [222, 111],
  [243, 109],
  [247, 83],
  [260, 75],
  [273, 51],
  [293, 44],
  [307, 34],
  [335, 40],
  [343, 55],
  [363, 61],
  [377, 87],
  [370, 107],
  [378, 120],
  [366, 134],
  [343, 138],
  [332, 146],
  [308, 142],
  [295, 151],
  [281, 169],
  [268, 178],
  [249, 180],
  [232, 197],
  [215, 199],
  [202, 192],
  [182, 192],
  [178, 180],
  [158, 169],
  [151, 150],
  [140, 147],
  [149, 131],
  [143, 119],
  [134, 110],
  [135, 100],
  [113, 93],
  [104, 103],
  [94, 111],
  [86, 132],
  [72, 136],
  [66, 149],
  [43, 153],
  [18, 148],
];
function displaced(points, y) {
  return points.map(([x, v]) => [x, v + y]);
}
function pine(x, y, h) {
  oval(pen, x + 2, y + 1, h * 0.44, 2, "#455449");
  rect(pen, x - 1, y - 4, 3, 5, "#553f38");
  for (let j = 0; j < 2; j++) {
    const top = y - h + j * h * 0.31,
      bottom = y - h * 0.32 + j * h * 0.23,
      w = h * (0.27 + j * 0.09);
    poly(
      pen,
      [
        [x, top],
        [x + w, bottom],
        [x - w, bottom],
      ],
      "#214947",
    );
    poly(
      pen,
      [
        [x, top],
        [x + 1, bottom],
        [x - w, bottom],
      ],
      "#41806a",
    );
  }
}
function lighthouse(c, x, y) {
  oval(c, x + 2, y + 1, 15, 5, "#465747");
  poly(
    c,
    [
      [x - 7, y],
      [x - 4, y - 26],
      [x + 4, y - 26],
      [x + 9, y],
    ],
    "#ffdf9b",
  );
  poly(
    c,
    [
      [x + 2, y - 26],
      [x + 5, y - 26],
      [x + 9, y],
      [x + 4, y],
    ],
    "#b17b66",
  );
  poly(
    c,
    [
      [x - 6, y - 10],
      [x + 7, y - 14],
      [x + 7, y - 9],
      [x - 6, y - 5],
    ],
    "#b65344",
  );
  rect(c, x - 6, y - 31, 12, 7, "#493e4c");
  rect(c, x - 4, y - 30, 8, 5, "#ffd46e");
  rect(c, x, y - 30, 1, 5, "#9b6753");
  rect(c, x - 8, y - 25, 16, 2, "#35494a");
  poly(
    c,
    [
      [x - 8, y - 31],
      [x, y - 37],
      [x + 8, y - 31],
    ],
    "#c15e47",
  );
  rect(c, x - 1, y - 39, 2, 3, "#f7c781");
  rect(c, x - 2, y - 5, 4, 6, "#594749");
}
function renderGround() {
  const c = pen;
  if (!art) {
    rect(c, 0, 0, 384, 228, "#e6eee5");
    for (let x = 0; x < 384; x += 19)
      line(
        c,
        [
          [x, 0],
          [x, 228],
        ],
        "#d9e3d8",
      );
    for (let y = 0; y < 228; y += 19)
      line(
        c,
        [
          [0, y],
          [384, y],
        ],
        "#d9e3d8",
      );
    line(c, route, "#bdc9b7", 14);
    line(c, route, "#f8f8ee", 9);
    rect(c, 348, 86, 15, 19, "#519472");
    rect(c, 352, 81, 7, 5, "#519472");
    return;
  }
  rect(c, 0, 0, 384, 228, "#183743");
  for (let i = 0; i < 680; i++) {
    const x = noise(i + 23) * 384,
      y = noise(i + 923) * 228,
      len = 1 + noise(i + 723) * 9;
    rect(c, x, y, Math.ceil(len), 1, i % 4 ? "#214754" : "#326070");
  }
  poly(c, displaced(land, 9), "#5b9290");
  poly(c, displaced(land, 7), "#33586a");
  poly(c, displaced(land, 4), "#914f47");
  poly(c, land, "#ae935c");
  poly(
    c,
    land.map(([x, y]) => [194 + (x - 194) * 0.975, 110 + (y - 110) * 0.96]),
    "#75835c",
  );
  for (let i = 0; i < 1250; i++) {
    const x = Math.floor(noise(3310 + i) * 384),
      y = Math.floor(noise(6420 + i) * 228);
    const pix = c.getImageData(x, y, 1, 1).data;
    if (pix[0] !== 117) continue;
    rect(c, x, y, i % 7 ? 2 : 4, 1, i % 6 ? "#839064" : "#566e54");
    if (i % 13 === 0) rect(c, x, y - 2, 1, 2, "#a4ac71");
  }
  c.lineJoin = "round";
  line(c, route, "#515d4a", 14);
  line(c, route, "#aa8864", 12);
  line(c, route, "#ddbd82", 8);
  for (let d = 5; d < length - 3; d += 9) {
    const [x, y] = position(d);
    rect(c, x - 1, y + 1, 2, 1, "#c7a371");
  }
  for (let i = 0; i < 12; i++) {
    rect(c, i * 3, 125, 2, 12, "#8f6850");
    rect(c, i * 3, 125, 2, 1, "#d6ab73");
  }
  rect(c, 0, 123, 34, 2, "#6a4d41");
  rect(c, 0, 137, 34, 2, "#6a4d41");
  for (const [x, y, h] of [
    [52, 69, 11],
    [61, 61, 16],
    [83, 50, 12],
    [109, 43, 10],
    [166, 47, 16],
    [184, 61, 11],
    [157, 119, 12],
    [168, 154, 13],
    [179, 168, 18],
    [194, 175, 13],
    [208, 187, 14],
    [250, 172, 10],
    [281, 74, 13],
    [304, 57, 15],
    [321, 59, 10],
    [333, 62, 15],
    [343, 131, 11],
    [309, 134, 14],
    [365, 114, 11],
    [58, 144, 9],
  ])
    pine(x, y, h);
  for (const [x, y] of [
    [25, 112],
    [84, 122],
    [115, 76],
    [206, 131],
    [253, 143],
    [277, 106],
    [331, 82],
  ]) {
    rect(c, x, y - 4, 2, 5, "#5b5143");
    rect(c, x - 1, y - 6, 4, 3, "#f9d387");
  }
  for (const [x, y, s] of [
    [35, 47, 6],
    [115, 170, 7],
    [135, 182, 3],
    [305, 188, 7],
    [340, 151, 4],
    [215, 60, 6],
    [229, 55, 3],
    [43, 188, 6],
    [353, 20, 5],
  ]) {
    oval(c, x, y + 1, s + 3, 2, "#4c7a7d");
    poly(
      c,
      [
        [x - s, y],
        [x - 2, y - s],
        [x + 2, y - s + 1],
        [x + s, y],
      ],
      "#737b72",
    );
    poly(
      c,
      [
        [x - s, y],
        [x - 2, y - s],
        [x, y - 2],
      ],
      "#b2ac8c",
    );
  }
  // Tidal pools, mooring posts and fishing floats at the quiet edges of the map.
  for (const [x, y] of [
    [88, 163],
    [29, 62],
    [343, 175],
    [213, 69],
  ]) {
    rect(c, x - 4, y + 1, 10, 1, "#4c8187");
    rect(c, x - 2, y - 1, 5, 2, "#c7b190");
    rect(c, x, y - 5, 2, 4, "#d27b5b");
    rect(c, x, y - 6, 2, 1, "#f4d99b");
  }
  for (const [x, y] of [
    [133, 66],
    [276, 148],
    [65, 123],
    [187, 147],
    [229, 150],
    [317, 66],
  ]) {
    rect(c, x, y, 4, 1, "#597155");
    rect(c, x + 1, y - 2, 1, 2, "#e2bc81");
    rect(c, x + 3, y - 3, 1, 2, "#dec99a");
  }
  lighthouse(c, 357, 102);
}
function drawGun(c, x, y, type, active) {
  if (!art) {
    const colors = ["#db8c39", "#258bb0", "#ac5e83"];
    rect(c, x - 5, y - 5, 10, 10, colors[type]);
    rect(c, x - 1, y - 8, 3, 7, "#364938");
    return;
  }
  const tones = [
    ["#b65142", "#ffcb70"],
    ["#528f99", "#a6f7f3"],
    ["#7c687f", "#f3c1ab"],
  ][type];
  oval(c, x, y + 3, 9, 3, "#475648");
  rect(c, x - 6, y - 1, 12, 4, "#534c48");
  rect(c, x - 5, y - 3, 10, 3, "#bca476");
  if (type === 2) {
    poly(
      c,
      [
        [x - 5, y - 4],
        [x - 6, y - 9],
        [x + 3, y - 12],
        [x + 6, y - 7],
        [x + 2, y - 3],
      ],
      tones[0],
    );
    line(
      c,
      [
        [x - 5, y - 8],
        [x + 3, y - 11],
      ],
      tones[1],
      2,
    );
    return;
  }
  rect(c, x - 3, y - 12, 6, 10, tones[0]);
  rect(c, x - 4, y - 11, 8, 4, tones[1]);
  if (type === 0)
    poly(
      c,
      [
        [x - 6, y - 12],
        [x, y - 17],
        [x + 6, y - 12],
      ],
      "#ad5142",
    );
  else {
    poly(
      c,
      [
        [x, y - 21],
        [x + 4, y - 16],
        [x, y - 10],
        [x - 4, y - 15],
      ],
      tones[1],
    );
    rect(c, x - 4, y - 10, 8, 2, "#526f7b");
  }
  if (active) {
    rect(c, x - 1, y - 12, 2, 3, "#fff9c6");
  }
}
function enemy(c, e, time) {
  const [x, y] = e.pos;
  const k = e.kind;
  if (!art) {
    oval(c, x, y, 3 + k, 3 + k, ["#be604d", "#c09d33", "#71475d"][k]);
    return;
  }
  c.save();
  c.translate(x, y);
  c.scale(1.3, 1.3);
  c.translate(-x, -y);
  const t = Math.sin(time * 12 + e.id),
    wing = t > 0 ? 5 : 3,
    body = ["#f9cc86", "#fff4ae", "#e2a4a2"][k],
    outer = ["#ad544b", "#a38c42", "#855268"][k];
  oval(c, x + 1, y + 2, 5 + k, 2, "#826e54");
  for (const s of [-1, 1]) {
    poly(
      c,
      [
        [x, y - 2],
        [x + s * (wing + 2 + k), y - 3 - wing * 0.65],
        [x + s * (5 + k), y],
        [x + s * 2, y + 1],
      ],
      outer,
    );
    rect(c, x + s * (3 + k) - 1, y - 3, 2, 2, body);
  }
  rect(c, x - 1, y - 4, 3, 6, k === 2 ? "#624557" : "#593f48");
  rect(c, x, y - 4, 2, 1, body);
  if (e.chill > 0) rect(c, x - 3, y + 2, 6, 1, "#aef9ed");
  c.restore();
}
function paintMap(w, time, focus, selected) {
  const c = ctx;
  c.drawImage(terrain, 0, 0);
  if (art) {
    const sweep = 0.4 * Math.sin(time * 0.55);
    poly(
      c,
      [
        [357, 74],
        [357 - 59, 74 + Math.sin(sweep - 0.13) * 64],
        [357 - 62, 74 + Math.sin(sweep + 0.13) * 64],
      ],
      "#ffe09434",
    );
  }
  sockets.forEach(([x, y], i) => {
    if (i === focus) {
      c.setLineDash([2, 3]);
      c.strokeStyle = art ? "#fff4aab8" : "#597c65";
      c.beginPath();
      c.arc(
        x,
        y,
        guns[w.towers[i]?.type ?? selected].range * w.range,
        0,
        Math.PI * 2,
      );
      c.stroke();
      c.setLineDash([]);
    }
    if (w.towers[i]) {
      c.save();
      c.translate(x, y);
      if (art) c.scale(1.22, 1.22);
      drawGun(c, 0, 0, w.towers[i].type, w.phase === "fight");
      c.restore();
    } else if (art) {
      poly(
        c,
        [
          [x - 9, y],
          [x - 5, y - 4],
          [x + 6, y - 4],
          [x + 9, y],
          [x + 6, y + 4],
          [x - 6, y + 4],
        ],
        "#515b50",
      );
      rect(c, x - 5, y - 3, 10, 5, "#ab9c72");
      rect(c, x - 3, y - 1, 6, 1, "#fff0ae");
      rect(c, x, y - 3, 1, 5, "#fff0ae");
    } else {
      rect(c, x - 5, y - 5, 10, 10, "#bbcaba");
      rect(c, x - 3, y, 7, 1, "#546d58");
      rect(c, x, y - 3, 1, 7, "#546d58");
    }
  });
  for (const e of w.hostiles) {
    enemy(c, e, time);
    if (e.hp < e.max) {
      const [x, y] = e.pos;
      rect(c, x - 4, y - 10, 9, 1, "#634d47");
      rect(
        c,
        x - 4,
        y - 10,
        Math.ceil((9 * e.hp) / e.max),
        1,
        art ? "#fff4ad" : "#4d845f",
      );
    }
  }
  for (const s of w.shots) {
    const tint = (
      art
        ? ["#ffda78", "#c3fbff", "#ffc1a6"]
        : ["#c67827", "#498db6", "#9c537d"]
    )[s.type];
    c.globalAlpha = 1 - s.age / 0.27;
    line(c, [s.from, s.to], tint, art ? 1.8 : 1);
    if (art) {
      const [x, y] = s.to,
        r = 1 + Math.floor(s.age * 20);
      rect(c, x - r, y, 2 * r + 1, 1, tint);
      rect(c, x, y - r, 1, 2 * r + 1, tint);
    }
    c.globalAlpha = 1;
  }
}
renderGround();
