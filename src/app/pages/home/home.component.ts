import { Component, ViewChild } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { FilmCatalogComponent } from '../../components/home/film-catalog/film-catalog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(HeroComponent) hero!: HeroComponent;
  @ViewChild(FilmCatalogComponent) catalog!: FilmCatalogComponent;
  private home?: HTMLElement = undefined;
  private homePosition: number = 0;
  private isScrolled: boolean = false;

  public titleOpacity: number = 1;

  onScroll(e: Event) {
    this.home = e.target as HTMLElement;
    this.homePosition = this.home.scrollTop;
    this.handleScroll();
  }

  handleScroll() {
    const heroHeight = this.hero.heroSection.nativeElement.scrollHeight;
    const catalogPosition = this.catalog.catalogSection.nativeElement.offsetTop;

    this.titleOpacity = this.calculateOpacity(heroHeight, this.homePosition);

    if (
      !this.isScrolled &&
      this.homePosition > heroHeight * 0.1 &&
      this.homePosition < heroHeight * 0.3
    )
      this.scrollToSection(catalogPosition);
    else if (this.homePosition === 0) this.isScrolled = false;
  }

  calculateOpacity(height: number, position: number): number {
    const result = (height - position * 4) / height;
    return result >= 0 ? result : 0;
  }

  scrollToSection(newSectionPosition: number) {
    if (this.home) {
      this.isScrolled = true;
      this.home.scrollTo({
        top: newSectionPosition,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}
