import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  color: string;
  speed: number;
  glow: boolean;
}

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('starfield') private starfield!: ElementRef<HTMLCanvasElement>;
  private frameId: number | null = null;
  private speedSubscription: Subscription;
  private targetSpeedMultiplier = 1;
  private speedMultiplier = 1;

  constructor(private zone: NgZone, private storeService: StoreService) {
    this.speedSubscription = this.storeService.readStarSpeed$.subscribe((speed) => {
      this.targetSpeedMultiplier = speed;
    });
  }

  ngAfterViewInit(): void {
    this.drawStars();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.drawStars();
  }

  ngOnDestroy(): void {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    this.speedSubscription.unsubscribe();
  }

  private drawStars(): void {
    if (!this.starfield) return;
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    const canvas = this.starfield.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    let seed = 18357;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const count = Math.round(width * height / 1450);
    const stars: Star[] = [];

    for (let index = 0; index < count; index++) {
      const x = random() * width;
      const bandCenter = height * (0.18 + 0.6 * x / width);
      const y = random() < 0.3
        ? Math.max(0, Math.min(height, bandCenter + (random() + random() + random() - 1.5) * height * 0.5))
        : random() * height;
      const intensity = Math.pow(random(), 2.4);
      const radius = intensity > 0.92 ? 1.55 + random() * 0.55 : 0.3 + intensity * 1.15;
      const opacity = 0.12 + intensity * 0.78;
      const tint = random();
      const color = tint < 0.16 ? '255, 224, 190' : tint < 0.38 ? '194, 223, 255' : '239, 245, 255';

      stars.push({ x, y, radius, opacity, color, speed: 0.065 + random() * 0.11, glow: intensity > 0.94 });
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const render = (elapsed: number) => {
      context.clearRect(0, 0, width, height);
      this.speedMultiplier += (this.targetSpeedMultiplier - this.speedMultiplier) * Math.min(elapsed * 5, 1);
      const warp = Math.max(0, Math.min((this.speedMultiplier - 1) / 7.5, 1));
      if (warp > 0.01) {
        const tunnel = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.68);
        tunnel.addColorStop(0, `rgba(39, 91, 197, ${warp * 0.13})`);
        tunnel.addColorStop(1, 'rgba(24, 51, 140, 0)');
        context.fillStyle = tunnel;
        context.fillRect(0, 0, width, height);
      }
      for (const star of stars) {
        if (elapsed > 0) {
          star.x += (star.x - centerX) * star.speed * this.speedMultiplier * elapsed;
          star.y += (star.y - centerY) * star.speed * this.speedMultiplier * elapsed;
          if (star.x < -12 || star.x > width + 12 || star.y < -12 || star.y > height + 12) {
            const angle = random() * Math.PI * 2;
            const distance = Math.sqrt(random()) * Math.min(width, height) * 0.16;
            star.x = centerX + Math.cos(angle) * distance;
            star.y = centerY + Math.sin(angle) * distance;
          }
        }

        if (warp > 0.04) {
          const distanceX = star.x - centerX;
          const distanceY = star.y - centerY;
          const streakScale = warp * 0.18;
          context.strokeStyle = `rgba(${star.color}, ${star.opacity * warp * 0.8})`;
          context.lineWidth = Math.max(0.6, star.radius * (0.7 + warp));
          context.lineCap = 'round';
          context.beginPath();
          context.moveTo(star.x - distanceX * streakScale, star.y - distanceY * streakScale);
          context.lineTo(star.x, star.y);
          context.stroke();
        }

        if (star.glow) {
          const glow = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 6);
          glow.addColorStop(0, `rgba(${star.color}, ${star.opacity * 0.32})`);
          glow.addColorStop(1, `rgba(${star.color}, 0)`);
          context.fillStyle = glow;
          context.beginPath();
          context.arc(star.x, star.y, star.radius * 6, 0, Math.PI * 2);
          context.fill();
        }

        context.fillStyle = `rgba(${star.color}, ${star.opacity})`;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    render(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.zone.runOutsideAngular(() => {
      let previousTime = 0;
      const animate = (now: number) => {
        if (previousTime === 0) previousTime = now;
        if (now - previousTime >= 30) {
          render(Math.min((now - previousTime) / 1000, 0.05));
          previousTime = now;
        }
        this.frameId = requestAnimationFrame(animate);
      };
      this.frameId = requestAnimationFrame(animate);
    });
  }
}
