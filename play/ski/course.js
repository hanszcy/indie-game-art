(() => {
  "use strict";
  const finish = 3940;
  const start = 30;
  const gaps = [
    [455, 508],
    [891, 955],
    [1294, 1348],
    [1575, 1646],
    [2057, 2122],
    [2395, 2456],
    [2681, 2753],
    [3014, 3078],
    [3362, 3434],
    [3670, 3738],
  ];
  const camps = [start, 1080, 1840, 2830];
  const limit = (v, low, high) => Math.max(low, Math.min(high, v));
  const speed = (x) => 136 + 15 * Math.min(1, x / finish);
  const snow = (x) =>
    14 * Math.sin(x / 208) + 8 * Math.sin(x / 87) + 3 * Math.sin(x / 49);
  const grade = (x) => Math.atan2(snow(x + 2) - snow(x - 2), 4);
  const gapAt = (x) => gaps.findIndex(([a, b]) => x >= a && x < b);
  const meters = (x) =>
    Math.round(Math.max(0, Math.min(finish, x) - start) / 5);
  const fixedStep = 1 / 120;
  class Run {
    constructor() {
      this.reset();
    }
    reset(camp = 0) {
      this.camp = camp;
      this.x = camps[camp];
      this.y = snow(this.x);
      this.vy = 0;
      this.grounded = true;
      this.charge = 0;
      this.holding = false;
      this.state = "ready";
      this.land = 0;
      this.cleared = gaps.filter(([, b]) => b <= this.x).length;
      this.events = [];
    }
    press() {
      if (this.state === "ready") this.state = "running";
      if (this.state !== "running" || !this.grounded || this.holding)
        return false;
      this.holding = true;
      this.charge = 0;
      return true;
    }
    release() {
      if (!this.holding || this.state !== "running") return;
      this.holding = false;
      this.grounded = false;
      this.vy = -215 - this.charge * 112;
      this.events.push("jump");
      this.charge = 0;
    }
    cancelHold() {
      this.holding = false;
      this.charge = 0;
    }
    pause() {
      if (this.state !== "running") return;
      this.cancelHold();
      this.state = "paused";
    }
    resume() {
      if (this.state === "paused") this.state = "running";
    }
    step(dt) {
      if (this.state !== "running") return;
      this.land = Math.max(0, this.land - dt * 3.1);
      if (this.holding) this.charge = Math.min(1, this.charge + dt / 0.48);
      this.x += speed(this.x) * dt;
      const floor = snow(this.x);
      const solid = gapAt(this.x) < 0;
      if (this.grounded) {
        if (solid) this.y = floor;
        else {
          this.grounded = false;
          this.vy = 35;
          this.cancelHold();
        }
      } else {
        const oldY = this.y;
        this.vy += 690 * dt;
        this.y += this.vy * dt;
        if (solid && this.vy > 0 && oldY <= floor + 1 && this.y >= floor) {
          this.y = floor;
          this.grounded = true;
          this.land = 1;
          this.events.push("land");
        }
        if (this.y > floor + 70) {
          this.state = "fallen";
          this.events.push("fall");
          return;
        }
      }
      if (this.grounded) {
        const count = gaps.filter(([, b]) => this.x >= b).length;
        if (count > this.cleared) {
          this.cleared = count;
          this.events.push("clear");
        }
        if (this.camp + 1 < camps.length && this.x >= camps[this.camp + 1]) {
          this.camp++;
          this.events.push("camp");
        }
        if (this.x >= finish) {
          this.x = finish;
          this.cancelHold();
          this.state = "finished";
          this.events.push("finish");
        }
      }
    }
  }
  globalThis.SkiCourse = {
    Run,
    start,
    finish,
    camps,
    gaps,
    snow,
    speed,
    grade,
    meters,
    limit,
    fixedStep,
  };
})();
