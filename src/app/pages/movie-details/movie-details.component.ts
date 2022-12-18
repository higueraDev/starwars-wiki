import { Component, Input } from '@angular/core';
import { Film } from '../../models/entities/film';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  @Input() film!: Film;
  public image: string = '';

  ngOnChanges() {
    if (this.image === '' && this.film.episode_id)
      this.image = `./assets/images/films/EP${this.film.episode_id}_POS.jpg`;
  }
}
