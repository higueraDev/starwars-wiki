import { Component, Input, OnChanges } from '@angular/core';
import { Film } from '../../models/entities/film';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnChanges {
  @Input() film!: Film;
  public image: string = '';

  ngOnChanges() {
    if (this.image === '' && this.film.episode_id)
      this.image = `./assets/images/films/EP${this.film.episode_id}_POS.jpg`;
  }
}
