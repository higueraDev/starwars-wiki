import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { FilmCatalogComponent } from '../../components/home/film-catalog/film-catalog.component';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('homeMain') private homeMain!: ElementRef<HTMLElement>;
  @ViewChild(HeroComponent) private hero!: HeroComponent;
  private home?: HTMLElement = undefined;
  private homePosition: number = 0;
  private heroHeight: number = 0;
  public titleOpacity: number = 1;
  public isScrolled: boolean = false;

  constructor(private storeService: StoreService) {}

  ngAfterViewInit() {
    this.getHomeElement();
    this.getHeroHeight();
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
    this.storeService.setScrolled(true);
    this.getHomePosition();
    if (this.homePosition < this.heroHeight) this.handleTitleOpacity();
    if (this.homePosition === 0) this.storeService.setScrolled(false);
  }

  onScrollButtonClick() {
    this.getHeroHeight();
    this.scrollToSection(this.heroHeight);
  }

  handleTitleOpacity() {
    this.titleOpacity = this.calculateOpacity(
      this.heroHeight,
      this.homePosition
    );
  }

  calculateOpacity(height: number, position: number): number {
    const result = (height - position * 4) / height;
    return result >= 0 ? result : 0;
  }

  scrollToSection(newSectionPosition: number) {
    if (this.home)
      this.home.scrollTo({
        top: newSectionPosition,
        left: 0,
        behavior: 'smooth',
      });
  }
}
