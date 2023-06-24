import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-banner-background',
  templateUrl: './home-banner-background.component.html',
  styleUrls: ['./home-banner-background.component.scss']
})
export class HomeBannerBackgroundComponent implements OnInit {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  particles: Particle[] = [];

  ngOnInit(): void {
    this.canvas = document.getElementById('banner-background-canvas') as HTMLCanvasElement;
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;

    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "rgba(255,255,255,0.1)";

    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.init();
  }

  getDist(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  init(): void {
    for (let i = 0; i < 100; i += 1) {
      const x = Math.floor(Math.random() * this.canvas.width);
      const y = Math.floor(Math.random() * this.canvas.height);
      const speedX = Math.random() * (0.2 - 0.1) + 0.1;
      const speedY = Math.random() * (0.2 - 0.1) + 0.1;
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.5 ? 1 : -1;

      this.particles.push({
        x,
        y,
        speedX: dirX * speedX,
        speedY: dirY * speedY,
        neighbors: [],
      });
    }
    requestAnimationFrame(() => this.draw());
  }

  draw(): void {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.particles.length; i += 1) {
      let x = this.particles[i].x + this.particles[i].speedX;
      let y = this.particles[i].y + this.particles[i].speedY;
      if (x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height) {
        x = Math.floor(Math.random() * this.canvas.width);
        y = Math.floor(Math.random() * this.canvas.height);
      }

      const x1 = this.mouseX || 2000;
      const y1 = this.mouseY || 2000;
      const dist = this.getDist(x, y, x1, y1);
      if (dist < 200) {
        if (x < x1) {
          x -= 2;
        } else {
          x += 2;
        }
        if (y < y1) {
          y -= 2;
        } else {
          y += 2;
        }
      }

      this.ctx.moveTo(x, y);
      this.ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      this.particles[i].x = x;
      this.particles[i].y = y;
    }
    this.ctx.fill();

    for (let i = 0; i < this.particles.length; i += 1) {
      const x = this.particles[i].x;
      const y = this.particles[i].y;
      const neighbors = this.particles[i].neighbors;
      for (let j = 0; j < neighbors.length; j += 1) {
        const x1 = neighbors[j].x;
        const y1 = neighbors[j].y;
        const dist = this.getDist(x, y, x1, y1);
        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x1, y1);
          this.ctx.lineWidth = 3;
          this.ctx.stroke();
        }
      }
    }
    requestAnimationFrame(() => this.draw());
  }

  mouseX?: number;
  mouseY?: number;

  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    setTimeout(() => {
      if (this.mouseX === e.clientX && this.mouseY === e.clientY) {
        for (let i = 0; i < this.particles.length; i += 1) {
          let x = this.particles[i].x;
          let y = this.particles[i].y;
          const x1 = e.clientX;
          const y1 = e.clientY;
          const dist = this.getDist(x, y, x1, y1);

          if (dist < 200) {
            if (x < x1) {
              x -= 2;
            } else {
              x += 2;
            }
            if (y < y1) {
              y -= 2;
            } else {
              y += 2;
            }
          }
          this.particles[i].x = x;
          this.particles[i].y = y;
        }
      }
    }, 10);
  }

  constructor() {
    setInterval(() => {
      const copy = [...this.particles];
      for (let i = 0; i < this.particles.length; i += 1) {
        const x = this.particles[i].x;
        const y = this.particles[i].y;

        copy.sort((a, b) => {
          const x1 = a.x;
          const x2 = b.x;
          const y1 = a.y;
          const y2 = b.y;
          const dist1 = this.getDist(x, y, x1, y1);
          const dist2 = this.getDist(x, y, x2, y2);
          return dist1 - dist2;
        });

        this.particles[i].neighbors = copy.slice(0, 10);
      }
    }, 250);
  }
}

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  neighbors: Particle[];
}
