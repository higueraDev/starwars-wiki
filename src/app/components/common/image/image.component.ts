import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() img: string = '';
  @Input() wPercentage: number = 100;
}
