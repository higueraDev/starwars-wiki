import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('homeMain') private homeMain!: ElementRef<HTMLElement>;
  @ViewChild(HeroComponent) private hero!: HeroComponent;
  private home?: HTMLElement = undefined;
  private homePosition: number = 0;
  private heroHeight: number = 0;
  private returnAnimationFrame: number | null = null;
  private returnToHero = false;
  public heroTransitionProgress: number = 0;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.returnToHero = this.storeService.consumeHeroReturn();
    this.heroTransitionProgress = this.returnToHero ? 1 : 0;
    this.storeService.setIsHomePage(true);
  }

  ngAfterViewInit() {
    this.getHomeElement();
    this.getHeroHeight();
    if (this.returnToHero) {
      this.returnAnimationFrame = requestAnimationFrame(() => this.animateHeroReturn());
    }
  }

  private animateHeroReturn(): void {
    const duration = 260;
    let startTime: number | null = null;
    const step = (now: number) => {
      if (startTime === null) startTime = now;
      this.heroTransitionProgress = 1 - Math.min((now - startTime) / duration, 1);
      if (this.heroTransitionProgress > 0) {
        this.returnAnimationFrame = requestAnimationFrame(step);
      } else {
        this.returnAnimationFrame = null;
        this.returnToHero = false;
      }
    };
    this.returnAnimationFrame = requestAnimationFrame(step);
  }

  private getHomeElement() {
    this.home = this.homeMain.nativeElement;
  }

  private getHomePosition() {
    this.homePosition = this.homeMain.nativeElement.scrollTop;
  }

  private getHeroHeight() {
    this.heroHeight = this.hero.heroSection.nativeElement.scrollHeight;
  }

  onScroll() {
    this.getHomePosition();
    if (this.returnToHero && this.homePosition === 0) return;
    if (this.returnAnimationFrame !== null) {
      cancelAnimationFrame(this.returnAnimationFrame);
      this.returnAnimationFrame = null;
      this.returnToHero = false;
    }
    const transitionDistance = Math.max(this.heroHeight / 2 - 38, 1);
    this.heroTransitionProgress = Math.min(this.homePosition / transitionDistance, 1);
    this.storeService.setScrolled(this.homePosition > 0);
  }

  ngOnDestroy(): void {
    if (this.returnAnimationFrame !== null) cancelAnimationFrame(this.returnAnimationFrame);
    this.storeService.setIsHomePage(false);
  }

  onScrollButtonClick() {
    this.getHeroHeight();
    this.scrollToSection(this.heroTransitionProgress > 0.95 ? 0 : this.heroHeight);
  }

  scrollToSection(newSectionPosition: number) {
    if (this.home)
      this.home.scrollTo({
        top: newSectionPosition === 0 ? 0 : newSectionPosition - 100,
        left: 0,
        behavior: 'smooth',
      });
  }
}
