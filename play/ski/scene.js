(() => {
  "use strict";
  const { snow, grade, gaps, camps, finish, start, limit } = SkiCourse;
  const tau = Math.PI * 2;
  const ink = "#16364a",
    warmSnow = "#fff2d7",
    signal = "#c94734";
  const rand = (n) => {
    const v = Math.sin(n * 91.713 + 2) * 4578.34;
    return v - Math.floor(v);
  };
  const artImage = new Image();
  const art = document.documentElement.dataset.skin === "alpenglow";
  if (art) artImage.src = "../art/first-light.webp";
  function poly(c, pts, color) {
    c.beginPath();
    c.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]);
    c.closePath();
    c.fillStyle = color;
    c.fill();
  }
  function line(c, pts, color, w) {
    c.beginPath();
    c.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]);
    c.strokeStyle = color;
    c.lineWidth = w;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.stroke();
  }
  function circle(c, x, y, r, color) {
    c.fillStyle = color;
    c.beginPath();
    c.arc(x, y, r, 0, tau);
    c.fill();
  }
  function pine(c, x, y, h, color, highlight) {
    poly(
      c,
      [
        x,
        y - h,
        x - h * 0.11,
        y - h * 0.68,
        x - h * 0.07,
        y - h * 0.69,
        x - h * 0.23,
        y - h * 0.44,
        x - h * 0.15,
        y - h * 0.48,
        x - h * 0.32,
        y - h * 0.17,
        x - h * 0.25,
        y - h * 0.18,
        x - h * 0.35,
        y,
        x + h * 0.28,
        y - h * 0.04,
        x + h * 0.2,
        y - h * 0.2,
        x + h * 0.29,
        y - h * 0.2,
        x + h * 0.15,
        y - h * 0.5,
        x + h * 0.2,
        y - h * 0.49,
        x + h * 0.07,
        y - h * 0.72,
        x + h * 0.11,
        y - h * 0.7,
      ],
      color,
    );
    if (highlight)
      poly(
        c,
        [
          x,
          y - h,
          x - h * 0.11,
          y - h * 0.68,
          x - h * 0.05,
          y - h * 0.69,
          x - h * 0.19,
          y - h * 0.48,
          x - h * 0.1,
          y - h * 0.53,
          x - h * 0.25,
          y - h * 0.26,
          x - h * 0.06,
          y - h * 0.38,
          x + h * 0.03,
          y - h * 0.34,
          x - h * 0.02,
          y - h * 0.58,
          x + h * 0.04,
          y - h * 0.56,
        ],
        highlight,
      );
  }
  class Scene {
    constructor(canvas, route, reduced) {
      this.canvas = canvas;
      this.c = canvas.getContext("2d", { alpha: false });
      this.route = route;
      this.reduced = reduced;
      this.puffs = [];
      this.clock = 0;
      if (art) {
        const grain = document.createElement("canvas");
        grain.width = grain.height = 96;
        const gc = grain.getContext("2d");
        for (let i = 0; i < 4300; i++) {
          gc.fillStyle =
            i % 3 === 0 ? "rgba(255,249,219,.105)" : "rgba(79,64,50,.072)";
          gc.fillRect(
            rand(i + 5) * 96,
            rand(i + 5017) * 96,
            0.4 + rand(i + 62) * 1.3,
            0.5,
          );
        }
        this.grain = this.c.createPattern(grain, "repeat");
      }
      this.resize();
    }
    resize() {
      const box = this.canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      this.w = 390;
      this.h = (390 * box.height) / box.width;
      this.canvas.width = Math.round(box.width * ratio);
      this.canvas.height = Math.round(box.height * ratio);
      this.s = this.canvas.width / this.w;
      const b = this.route.getBoundingClientRect();
      this.route.width = Math.max(1, Math.round(b.width * ratio));
      this.route.height = Math.max(1, Math.round(b.height * ratio));
    }
    onEvent(event, run) {
      if (!art || this.reduced || !["jump", "land"].includes(event)) return;
      const n = event === "land" ? 13 : 6;
      for (let i = 0; i < n; i++)
        this.puffs.push({
          x: run.x - 5 - Math.random() * 7,
          y: run.y - 1,
          dx: -15 - Math.random() * 42,
          dy: -12 - Math.random() * 46,
          t: 0.24 + Math.random() * 0.28,
          r: 1 + Math.random() * 2,
        });
    }
    draw(run, dt) {
      if (run.state !== "paused") this.clock += dt;
      const c = this.c,
        w = this.w,
        h = this.h;
      c.setTransform(this.s, 0, 0, this.canvas.height / h, 0, 0);
      const ground = h * 0.675,
        origin = run.x - 88;
      if (art) this.alpine(c, run, ground);
      else this.standard(c, run, ground);
      const spans = [];
      let left = origin - 4;
      for (const [a, b] of gaps) {
        if (b < left || a > origin + w + 8) continue;
        if (a > left) spans.push([left, a]);
        left = Math.max(left, b);
      }
      if (left < origin + w + 8) spans.push([left, origin + w + 8]);
      for (const [a, b] of spans) this.bank(c, a, b, origin, ground, h);
      for (let i = 0; i < gaps.length; i++) {
        const x = gaps[i][0] - origin - 27;
        if (x < -20 || x > w + 20) continue;
        this.flag(c, x, ground + snow(gaps[i][0] - 27), i + 1);
      }
      for (let i = 1; i < camps.length; i++) {
        const x = camps[i] - origin;
        if (x > -30 && x < w + 30)
          this.post(c, x, ground + snow(camps[i]), false);
      }
      if (finish - origin < w + 65)
        this.post(c, finish - origin, ground + snow(finish), true);
      if (art) {
        if (run.state !== "paused") {
          for (const p of this.puffs) {
            p.t -= dt;
            p.x += p.dx * dt;
            p.y += p.dy * dt;
            p.dy += 90 * dt;
          }
          this.puffs = this.puffs.filter((p) => p.t > 0);
        }
        for (const p of this.puffs) {
          c.globalAlpha = Math.min(1, p.t * 4);
          circle(c, p.x - origin, ground + p.y, p.r, "#fff7e2");
        }
        c.globalAlpha = 1;
      }
      const phase = run.state === "running" || run.state === "ready";
      const float =
        phase && !this.reduced
          ? Math.sin(this.clock * (run.state === "ready" ? 2.4 : 9)) * 0.55
          : 0;
      if (art && run.grounded) {
        for (let i = 0; i < 2; i++) {
          const length = run.state === "ready" ? 14 : 32;
          line(
            c,
            [
              88 - length,
              ground + snow(run.x - length) + 2 + i * 1.7,
              80,
              ground + snow(run.x - 8) + 1.8 + i * 1.3,
            ],
            "#a2b1ac",
            0.8,
          );
        }
        if (run.state === "running" && !this.reduced) {
          for (let i = 0; i < 6; i++) {
            const t = (this.clock * 2.7 + i / 6) % 1;
            c.globalAlpha = (1 - t) * 0.8;
            circle(
              c,
              73 - t * (13 + rand(i) * 14),
              ground + run.y - 2 - 12 * Math.sin(t * Math.PI) * rand(i + 13),
              0.7 + rand(i + 20) * 0.7,
              "#fffae8",
            );
          }
          c.globalAlpha = 1;
        }
      }
      if (run.y < 65 || run.grounded)
        this.skier(c, 88, ground + run.y, run, float);
      if (art) {
        c.fillStyle = this.grain;
        c.fillRect(0, 0, w, h);
      }
      this.progress(run);
    }
    alpine(c, run, g) {
      const h = this.h,
        w = this.w;
      c.fillStyle = "#869eb0";
      c.fillRect(0, 0, w, h);
      if (artImage.complete && artImage.naturalWidth) {
        const top = g * 0.19,
          imageHeight = g + 32 - top,
          width = Math.max(540, Math.min(710, g * 1.08));
        const progress = limit((run.x - start) / (finish - start), 0, 1);
        const x = -(width - w) * (0.42 + 0.42 * progress);
        c.save();
        c.translate(0, top + 1);
        c.scale(1, -1);
        c.drawImage(
          artImage,
          0,
          0,
          artImage.width,
          (artImage.height * top) / imageHeight,
          x,
          0,
          width,
          top + 1,
        );
        c.restore();
        c.drawImage(artImage, x, top, width, imageHeight);
      } else this.standard(c, run, g);
      const treeHorizon = g - 38,
        offset = run.x * 0.36;
      for (
        let k = Math.floor((offset - 60) / 35);
        k <= (offset + w + 60) / 35;
        k++
      ) {
        const x = k * 35 - offset + rand(k + 200) * 16,
          y = treeHorizon + 19 * Math.sin(k * 0.5);
        pine(c, x, y, 17 + rand(k) * 35, "#425e71", null);
      }
      c.beginPath();
      c.moveTo(-8, h);
      for (let x = -8; x < w + 10; x += 6)
        c.lineTo(x, treeHorizon - 2 + 15 * Math.sin((x + offset) / 71));
      c.lineTo(w + 8, h);
      c.closePath();
      c.fillStyle = "#526c7e";
      c.fill();
      const off = run.x * 0.58;
      for (let k = Math.floor((off - 80) / 58); k <= (off + w + 80) / 58; k++) {
        const x = k * 58 - off + rand(k + 1) * 24,
          y = g + 12 + 9 * Math.sin(k * 2);
        const tall = 15 + rand(k + 8) * 46;
        pine(c, x, y, tall, "#335469", "#718593");
      }
    }
    standard(c, run, g) {
      const w = this.w,
        h = this.h;
      c.fillStyle = "#cbe5f7";
      c.fillRect(0, 0, w, h);
      circle(c, 305, Math.min(190, g * 0.44), 25, "#fff2b3");
      const off = run.x * 0.1;
      for (let i = -1; i < 6; i++) {
        const x = i * 145 - (off % 145),
          y = g - 140;
        poly(c, [x - 120, g + 30, x, y, x + 126, g + 30], "#98b7cf");
        poly(
          c,
          [
            x - 27,
            y + 38,
            x,
            y,
            x + 26,
            y + 35,
            x + 10,
            y + 30,
            x - 1,
            y + 37,
            x - 10,
            y + 27,
          ],
          "#f1f7fb",
        );
      }
      c.fillStyle = "#94b4c9";
      c.fillRect(0, g + 8, w, h - g);
      const off2 = run.x * 0.5;
      for (let k = Math.floor(off2 / 90) - 1; k <= (off2 + w) / 90 + 1; k++) {
        const x = k * 90 - off2;
        poly(
          c,
          [x - 12, g + 3, x, g - 26 - rand(k) * 23, x + 12, g + 3],
          "#7198a0",
        );
      }
    }
    bank(c, a, b, o, g, h) {
      const edge = (x) => g + snow(x);
      c.beginPath();
      c.moveTo(a - o, h + 4);
      c.lineTo(a - o, edge(a));
      for (let t = a + 5; t < b; t += 5) c.lineTo(t - o, edge(t));
      c.lineTo(b - o, edge(b));
      c.lineTo(b - o, h + 4);
      c.closePath();
      c.fillStyle = art ? "#f6e8cc" : "#f7fbff";
      c.fill();
      c.save();
      c.clip();
      if (art) {
        for (let k = Math.floor((a - 42) / 47); k <= Math.ceil(b / 47); k++) {
          const x = k * 47 + rand(k + 4) * 15,
            face = g + snow(x) + 38 + rand(k + 8) * 26;
          poly(
            c,
            [
              x - o - 44,
              face + 15,
              x - o - 16,
              face - 3,
              x - o + 5,
              face - 9,
              x - o - 5,
              face - 1,
              x - o + 26,
              face - 8,
              x - o + 4,
              face + 4,
            ],
            "#d9d5c3",
          );
          const top = g + snow(x) + 7 + rand(k + 31) * 14;
          line(
            c,
            [x - o, top, x - o + 3 + rand(k) * 8, top - 1.5],
            "#c4bba7",
            0.85,
          );
        }
        for (const [gapA, gapB] of gaps) {
          for (const [lip, sign] of [
            [gapA, -1],
            [gapB, 1],
          ]) {
            if (lip < a - 1 || lip > b + 1) continue;
            const x = lip - o,
              y = edge(lip);
            poly(
              c,
              [
                x,
                y + 2,
                x + sign * 9,
                y + 8,
                x + sign * 4,
                y + 15,
                x + sign * 17,
                y + 31,
                x + sign * 10,
                y + 37,
                x + sign * 21,
                y + 67,
                x + sign * 14,
                h,
                x,
                h,
              ],
              "#91acb5",
            );
            poly(
              c,
              [
                x,
                y + 8,
                x + sign * 4,
                y + 20,
                x + sign * 4,
                y + 34,
                x + sign * 10,
                y + 49,
                x,
                h,
              ],
              "#54788b",
            );
          }
        }
      }
      c.restore();
      c.beginPath();
      c.moveTo(a - o, edge(a));
      for (let x = a + 5; x < b; x += 5) c.lineTo(x - o, edge(x));
      c.lineTo(b - o, edge(b));
      c.strokeStyle = art ? warmSnow : "#b2d0e4";
      c.lineWidth = art ? 4 : 2;
      c.stroke();
    }
    flag(c, x, y, i) {
      const wind =
        art && !this.reduced ? Math.sin(this.clock * 4 + i) * 1.5 : 0;
      line(c, [x, y, x + 1, y - 25], art ? ink : "#4c6776", 2);
      poly(
        c,
        [
          x + 1,
          y - 25,
          x + 15,
          y - 23 + wind,
          x + 12,
          y - 18 + wind,
          x + 1,
          y - 19,
        ],
        art ? signal : "#ef754c",
      );
      if (art) line(c, [x + 4, y - 24, x + 4, y - 20], "#ffe2b0", 1.4);
    }
    post(c, x, y, end) {
      const col = art ? ink : "#48667a";
      if (art && !end) {
        c.save();
        c.translate(x - 22, y + 3);
        poly(c, [-32, -21, -2, -25, 1, -2, -31, -3], "#874e3a");
        poly(
          c,
          [-39, -20, -18, -36, 7, -26, 4, -22, -17, -29, -32, -18],
          "#dccab1",
        );
        poly(
          c,
          [-39, -20, -18, -36, 7, -26, -12, -31, -18, -31, -31, -22],
          "#fff0d4",
        );
        c.fillStyle = "#35495a";
        c.fillRect(-24, -19, 7, 7);
        c.fillRect(-10, -17, 5, 14);
        c.fillStyle = "#ebb66a";
        c.fillRect(-23, -18, 4, 4);
        c.restore();
      }
      line(c, [x, y, x, y - 43], col, 3);
      if (end) {
        for (let j = 0; j < 3; j++)
          for (let i = 0; i < 5; i++) {
            c.fillStyle = (i + j) % 2 ? col : "#fff7dd";
            c.fillRect(x + i * 4, y - 43 + j * 4, 4, 4);
          }
      } else {
        poly(
          c,
          [
            x - 7,
            y - 39,
            x + 13,
            y - 39,
            x + 17,
            y - 34,
            x + 13,
            y - 29,
            x - 7,
            y - 29,
          ],
          art ? "#a64b36" : "#56899f",
        );
        line(c, [x - 3, y - 34, x + 8, y - 34], "#fff5dd", 1.4);
      }
    }
    skier(c, x, y, r, float) {
      const airborne = !r.grounded;
      const bend = r.holding
        ? 0.15 + 0.85 * r.charge
        : airborne
          ? 0.69
          : r.land * 0.82 + 0.11;
      const tilt = r.grounded ? grade(r.x) : limit(r.vy / 1300, -0.21, 0.23);
      c.save();
      c.translate(x, y - 1);
      c.rotate(tilt);
      if (art) c.scale(1.16, 1.16);
      if (art) {
        const hip = [-4, -22 + 6 * bend + float],
          knee = [6 + 3 * bend, -14 + 5 * bend],
          shoulder = [1 + 4 * bend, -37 + 12 * bend + float],
          head = [shoulder[0] + 4, shoulder[1] - 5];
        const hand = [13 + 3 * bend, shoulder[1] + 7],
          elbow = [5, shoulder[1] + 11];
        line(c, [-18, -0.8, 0, 0.2, 16, -0.3, 20, -3], "#674e3e", 1.9);
        line(c, [-17, -2, 2, -1, 19, -2, 22, -5], signal, 2.3);
        line(c, [elbow[0] - 1, elbow[1], -20, 2], "#4c6570", 1.1);
        line(c, [hand[0] + 1, hand[1], -7, 1], "#284658", 1.35);
        line(c, [-9, -1, -4, 0], "#405764", 1.5);
        line(
          c,
          [hip[0] - 2, hip[1], knee[0] - 4, knee[1] + 1, -3, -4],
          "#465467",
          4.2,
        );
        line(c, [...hip, ...knee, 1, -5], ink, 5.0);
        line(c, [1, -5, 5, -4, 7, -3], ink, 4.1);
        const flutter = !this.reduced ? Math.sin(this.clock * 11) * 1.5 : 0;
        poly(
          c,
          [
            shoulder[0] + 3,
            shoulder[1] - 2,
            shoulder[0] - 6,
            shoulder[1],
            shoulder[0] - 14,
            shoulder[1] - 3 + flutter,
            shoulder[0] - 20,
            shoulder[1] - 1 + flutter,
            shoulder[0] - 16,
            shoulder[1] + 2 + flutter,
            shoulder[0] - 7,
            shoulder[1] + 4,
            shoulder[0] + 3,
            shoulder[1] + 2,
          ],
          signal,
        );
        poly(
          c,
          [
            hip[0] - 4,
            hip[1] + 1,
            hip[0] + 3,
            hip[1] + 2,
            shoulder[0] + 6,
            shoulder[1] + 4,
            shoulder[0] + 4,
            shoulder[1] - 2,
            shoulder[0] - 2,
            shoulder[1] - 1,
            hip[0] - 4,
            hip[1] - 3,
          ],
          "#ce8030",
        );
        line(
          c,
          [shoulder[0] - 1, shoulder[1] + 2, ...elbow, ...hand],
          "#efb149",
          4.1,
        );
        circle(c, ...hand, 2, ink);
        circle(c, ...head, 4.1, "#d58a62");
        poly(
          c,
          [
            head[0] - 5,
            head[1],
            head[0] - 4,
            head[1] - 4,
            head[0] - 1,
            head[1] - 6,
            head[0] + 2.5,
            head[1] - 5,
            head[0] + 4.5,
            head[1] - 1,
          ],
          signal,
        );
        line(
          c,
          [head[0] + 0.3, head[1] - 0.8, head[0] + 4.8, head[1] - 0.9],
          ink,
          2.1,
        );
      } else {
        const z = bend * 8 + float;
        line(c, [-15, -1, 16, -1, 19, -4], "#325267", 2.2);
        line(c, [-3, -17 + z, 5, -13 + z / 2, 0, -3], "#364e60", 4.2);
        line(c, [-3, -18 + z, 1, -28 + z], "#3c86bd", 6);
        circle(c, 3, -33 + z, 4.1, "#35536b");
        line(c, [2, -25 + z, 11, -20 + z], "#426278", 3);
        line(c, [11, -20 + z, -6, 0], "#778d99", 1.1);
      }
      c.restore();
    }
    progress(r) {
      const p = this.route,
        c = p.getContext("2d"),
        w = p.width,
        h = p.height;
      c.clearRect(0, 0, w, h);
      const px = (x) => 3 + ((w - 6) * (x - start)) / (finish - start);
      const y = h * 0.58;
      c.fillStyle = art ? "#bfb6a1" : "#b8ccdc";
      c.fillRect(2, y - 1, w - 4, 2);
      c.fillStyle = art ? signal : "#387cb1";
      c.fillRect(2, y - 1, Math.max(0, px(r.x) - 2), 2);
      for (const camp of camps.slice(1)) {
        const x = px(camp);
        line(
          c,
          [x, y - h * 0.17, x, y + h * 0.17],
          art ? "#7b807c" : "#7a93a6",
          1.6,
        );
      }
      circle(c, px(r.x), y, Math.max(2, h * 0.18), art ? ink : "#387cb1");
    }
  }
  globalThis.SkiScene = Scene;
})();
