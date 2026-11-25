const art = document.body.dataset.edition === "lantern";
const canvas = document.querySelector("#map"),
  ctx = canvas.getContext("2d");
const backdrop = new Image();
if (art) backdrop.src = "../harbor.webp";
const ink = "#273c47",
  palette = ["#cd7350", "#4a9dae", "#b85347"];
const oval = (x, y, rx, ry, c) =>
  '<ellipse cx="' +
  x +
  '" cy="' +
  y +
  '" rx="' +
  rx +
  '" ry="' +
  ry +
  '" fill="' +
  c +
  '"/>';
const path = (d, c) => '<path d="' + d + '" fill="' + c + '"/>';
function mark(d, c, w) {
  return (
    '<path d="' +
    d +
    '" fill="none" stroke="' +
    c +
    '" stroke-width="' +
    w +
    '" stroke-linecap="round" stroke-linejoin="round"/>'
  );
}
const eye = (x, y) => oval(x, y, 1.8, 2, ink);
function portrait(type, pretty = art) {
  let artbody = "";
  if (!pretty) {
    const shapes = [
      "M14 41 30 10 47 41Z",
      "M31 8 51 29 31 49 11 29Z",
      "M12 14h37v31H12Z",
    ];
    artbody =
      path(shapes[type], palette[type]) +
      mark(
        [
          "M22 35 38 20m-5 0h5v5",
          "M31 18v23m-9-17 18 12m-18 0 18-12",
          "M22 36 40 21m-10 1 8 9",
        ][type],
        "#f8f3de",
        3,
      );
  } else if (type === 0) {
    artbody =
      oval(30, 50, 18, 4, "#594d4c33") +
      path("M12 45q2-13 16-13 15 0 20 13l-5 4H17z", "#237e80") +
      oval(17, 18, 6, 6, "#97583c") +
      oval(43, 18, 6, 6, "#97583c") +
      oval(30, 28, 19, 16, "#bc7950") +
      path("M13 26q7-13 16-11 12-3 20 10l-7-1-2 3-8-4-11 4z", "#df9d65") +
      oval(24, 33, 8, 5, "#ffdda0") +
      oval(35, 33, 8, 5, "#ffdda0") +
      eye(22, 26) +
      eye(37, 26) +
      oval(30, 30, 3, 2, ink) +
      mark("M30 32v2m-12 1-6 1m28-2 6 1", ink, 1.1) +
      path("M14 18q-1-10 13-11 15-3 16 7l-8 3z", "#1c5c69") +
      path("M12 17q16-7 31-4l3 3-31 5z", "#efb85a") +
      path("M23 42l8 3-3 6-6-5z", "#d7553d") +
      mark("M41 45 53 15", ink, 3) +
      path("m51 18 3-10 3 8-3-1-3 4z", "#c1d1c8");
  } else if (type === 1) {
    artbody =
      oval(30, 50, 17, 4, "#594d4c33") +
      path(
        "M12 44q7-8 5-22 1-14 14-14 14 0 16 13l3 22-8 3-6-2-8 2-6-2z",
        "#264a61",
      ) +
      oval(30, 30, 13, 14, "#fff2cd") +
      path("M17 23q3-9 14-4 8-5 14 4l-6-12-14-1z", "#31566a") +
      eye(24, 25) +
      eye(37, 25) +
      path("m27 29 8-1-5 5z", "#e6a34f") +
      path("M14 36q16 6 32-3l1 6-13 4-1 8-6-2 1-6-12-2z", "#68b9be") +
      mark("M43 42 51 18", "#785b45", 3) +
      path("m51 8 5 8-6 9-5-7z", "#a2e5e2") +
      mark("m51 10-1 10", "#eefffd", 1.4) +
      path("m19 14 5-8 2 2 7-5 6 9z", "#e2d6ae");
  } else {
    artbody =
      oval(31, 49, 24, 5, "#594d4c33") +
      mark("M17 38 9 45m14-6-5 9m23-9 7 7m-13-6 5 8", "#913d3c", 3) +
      path("M12 33Q9 25 5 24q-5-6-2-12l6 5 4-7q9 7 1 15l5 8z", "#d96d4c") +
      path("M40 32q7-2 10-8-4-7 2-13l2 7 7-4q1 11-6 13l-9 12z", "#d96d4c") +
      oval(30, 34, 19, 12, "#be5642") +
      oval(28, 32, 14, 8, "#e79465") +
      mark("M23 27v-6m15 6v-6", "#a4533f", 3) +
      eye(23, 21) +
      eye(38, 21) +
      mark("m27 35 4 1 3-1", ink, 1.3) +
      path("m31 36 11-15 9 5-12 15z", "#384d55") +
      path("m40 22 3-4 12 6-3 5z", "#c9b17d") +
      oval(48, 23, 4, 2, "#33444a") +
      path("M18 17q3-8 11-7l7 4-2 3z", "#435e64");
  }
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 55">' +
    artbody +
    "</svg>"
  );
}
function spriteImage(svg) {
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  return img;
}
const crewIcons = [0, 1, 2].map((k) => spriteImage(portrait(k)));
function raider(k) {
  if (!art)
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 54">' +
      ["#dc8a5f", "#82b7a4", "#947593", "#bc424e"]
        .map((c, i) => (i === k ? oval(30, 28, 13 + k * 2, 12 + k, c) : ""))
        .join("") +
      "</svg>"
    );
  let v = oval(30, 46, 18, 3, "#173d5238");
  if (k === 3) {
    v +=
      path("m3 30 8-3 2-14 8 6 10-12 6 12 10-7 1 15 9 4-12 13H15z", "#884655") +
      path("m8 31 42-1-9 12H19z", "#cc745a") +
      mark("M19 29q10 5 21 0", ink, 2) +
      path("M29 24V4l13 5-13 5z", "#f2c568") +
      eye(20, 32) +
      eye(39, 32);
  } else if (k === 0) {
    v +=
      path(
        "M9 36q-8 1-5-10l6 2 2-7q8 2 7 9l4 6 15-1 4-4q-1-10 8-11l1 6 5-2q5 11-9 13l-7 4-20-1z",
        "#c17073",
      ) +
      oval(30, 30, 17, 12, "#9d6276") +
      path("M16 28q1-16 12-18l12 2 4 11-11-4-4 5z", "#dfab91") +
      eye(24, 30) +
      eye(36, 30) +
      mark("m23 37 11-1", "#593f55", 1.5);
  } else if (k === 1) {
    v +=
      mark(
        "M17 30q-5 7-1 14m8-13q-3 8 2 15m7-16q-1 8 3 13m6-14q5 7 3 12",
        "#78a9ae",
        3,
      ) +
      path("M10 31q3-24 19-25 18-1 21 24l-8 1-5-3-7 4-7-3-7 3z", "#83c3c5") +
      path("M16 24q4-14 17-14l6 2-14 5z", "#c4e7d7") +
      eye(24, 24) +
      eye(36, 24);
  } else {
    v +=
      path(
        "M8 33q-7-11 0-16l5 5 6-10 5 5 10-10 3 8 11-3-1 10 8 2-4 7 2 6-14 3-20-1z",
        "#756987",
      ) +
      oval(31, 32, 19, 11, "#aa92a9") +
      path("m16 25 7-9 9 5 6-4 9 9-13-3-3 3-7-2z", "#d4bbc0") +
      eye(24, 31) +
      eye(38, 31) +
      mark("m23 37 11 1", "#655666", 2);
  }
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 54">' +
    v +
    "</svg>"
  );
}
const monsters = [0, 1, 2, 3].map((k) => spriteImage(raider(k)));
function paint(run, clock) {
  const c = ctx;
  c.setTransform(canvas.width / 320, 0, 0, canvas.height / 320, 0, 0);
  c.fillStyle = art ? "#6eb7ba" : "#e1eced";
  c.fillRect(0, 0, 320, 320);
  if (art && backdrop.complete && backdrop.naturalWidth)
    c.drawImage(backdrop, 0, 0, 320, 320);
  else {
    c.strokeStyle = "#b9d1d3";
    c.lineWidth = 0.7;
    for (let i = 40; i < 320; i += 37) {
      c.beginPath();
      c.moveTo(0, i);
      c.lineTo(320, i);
      c.stroke();
    }
  }
  c.fillStyle = art ? "#506c68" : "#a0b3ad";
  c.fillRect(0, WALL + 4, 320, 21);
  c.fillStyle = art ? "#e3c596" : "#c4cec8";
  c.fillRect(0, WALL + 5, 320, 9);
  for (let x = 1; x < 320; x += 23) {
    c.fillStyle = art ? "#ad9779" : "#93a69f";
    c.fillRect(x, WALL + 5, 1, 8);
    c.fillStyle = art ? "#fae6b7" : "#d8dfdb";
    c.fillRect(x, WALL + 1, 14, 6);
  }
  for (const e of run.enemies) {
    const size = e.kind === 3 ? 65 : 34,
      bob = art ? Math.sin(clock * 6 + e.id) * 1.6 : 0;
    const img = monsters[e.kind];
    if (img.complete && img.naturalWidth)
      c.drawImage(
        img,
        e.x - size / 2,
        e.y - size * 0.7 + bob,
        size,
        size * 0.9,
      );
    if (e.hp < e.max || e.kind === 3) {
      c.fillStyle = "#38545a";
      c.fillRect(e.x - size * 0.34, e.y - size * 0.75, size * 0.68, 2.7);
      c.fillStyle = e.chill ? "#a8f7ff" : "#ffda83";
      c.fillRect(
        e.x - size * 0.34,
        e.y - size * 0.75,
        (size * 0.68 * e.hp) / e.max,
        2.7,
      );
    }
  }
  run.slots.forEach((hero, slot) => {
    if (!hero) return;
    const x = 40 + (slot % 4) * 80 + (slot >= 4 ? 9 : -9),
      size = 24 + hero.rank * 2,
      img = crewIcons[hero.type];
    if (img.complete && img.naturalWidth)
      c.drawImage(
        img,
        x - size / 2,
        WALL - size + (slot >= 4 ? 9 : 3),
        size,
        size,
      );
  });
  for (const f of run.fx) {
    const t = Math.min(1, f.age / 0.14);
    c.globalAlpha = 1 - Math.max(0, f.age - 0.16) * 8;
    c.strokeStyle = ["#ffcf74", "#b7ffff", "#ffb181"][f.k];
    c.lineWidth = art ? 2.6 : 1.6;
    c.beginPath();
    c.moveTo(
      f.x + (f.tx - f.x) * Math.max(0, t - 0.23),
      f.y + (f.ty - f.y) * Math.max(0, t - 0.23),
    );
    c.lineTo(f.x + (f.tx - f.x) * t, f.y + (f.ty - f.y) * t);
    c.stroke();
    if (t === 1) {
      c.beginPath();
      c.arc(
        f.tx,
        f.ty,
        2 + (f.age - 0.14) * (f.k === 2 ? 110 : 50),
        0,
        Math.PI * 2,
      );
      c.stroke();
    }
    c.globalAlpha = 1;
  }
}
