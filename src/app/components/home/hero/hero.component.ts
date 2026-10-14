import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { StoreService } from '../../../services/store.service';

@Component({
  standalone: false,
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @Input() morphProgress: number = 0;
  @Output() scrollToCatalog = new EventEmitter<void>();

  public brandActive = false;
  private brandHovered = false;
  private activationTimer?: ReturnType<typeof setTimeout>;
  public title = 'Star Wars';
  public subtitle = 'Wiki';
  private viewportWidth = window.innerWidth;
  private viewportHeight = window.innerHeight;
  private saberAudio = new Audio('./assets/audio/saber-ignite.wav');

  constructor(private storeService: StoreService) {}

  @HostListener('window:resize')
  onResize(): void {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
  }

  get easedProgress(): number {
    const progress = Math.max(0, Math.min(this.morphProgress, 1));
    return progress * progress * (3 - 2 * progress);
  }

  get isCompact(): boolean {
    return this.morphProgress > 0.95;
  }

  get brandWidth(): number {
    const diameter = Math.min(this.viewportWidth * 0.72, 760);
    return diameter + (134 - diameter) * this.easedProgress;
  }

  get brandHeight(): number {
    const diameter = Math.min(this.viewportWidth * 0.72, 760);
    return diameter + (44 - diameter) * this.easedProgress;
  }

  get brandTop(): number {
    const center = Math.min(this.viewportHeight, 900) / 2;
    return center + (38 - center) * this.easedProgress;
  }

  get titleFontSize(): number {
    const diameter = Math.min(this.viewportWidth * 0.72, 760);
    const fullSize = Math.min(Math.max(this.viewportWidth * 0.09, 43.2), 120, diameter / 7);
    return fullSize + (12.3 - fullSize) * this.easedProgress;
  }

  get subtitleFontSize(): number {
    const fullSize = Math.min(Math.max(this.viewportWidth * 0.015, 12), 16.8);
    return fullSize + (8.8 - fullSize) * this.easedProgress;
  }

  get titleLetterSpacing(): number {
    return this.titleFontSize * 0.035 + 2 * this.easedProgress;
  }

  get ringOne(): number {
    return 52 * (1 - this.easedProgress);
  }

  get ringTwo(): number {
    return 104 * (1 - this.easedProgress);
  }

  onBrandClick(): void {
    clearTimeout(this.activationTimer);
    this.setBrandActive(true);
    this.activationTimer = setTimeout(() => {
      this.activationTimer = undefined;
      this.setBrandActive(this.brandHovered);
    }, 900);
    this.saberAudio.currentTime = 0;
    void this.saberAudio.play().catch(() => undefined);
    this.scrollToCatalog.emit();
  }

  onBrandHover(event: PointerEvent, active: boolean): void {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(any-hover: hover)').matches) {
      return;
    }
    this.brandHovered = active;
    this.setBrandActive(active || this.activationTimer !== undefined);
  }

  private setBrandActive(active: boolean): void {
    this.brandActive = active;
    this.storeService.setStarSpeed(active ? 8.5 : 1);
  }

  ngOnDestroy(): void {
    clearTimeout(this.activationTimer);
    this.storeService.setStarSpeed(1);
    this.saberAudio.pause();
  }
}
