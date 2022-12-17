import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;

  @Input() titleOpacity: number = 1

  public title = 'Star Wars'
  public subtitle = 'Wiki'
}
