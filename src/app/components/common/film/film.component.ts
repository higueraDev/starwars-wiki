import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Film } from '../../../models/entities/film';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnChanges {
  @Input() film!: Film;
  public image: string = '';
  public filmNumber: string = '';

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnChanges() {
    if (this.image === '' && this.film.episode_id)
      this.image = `./assets/images/films/EP${this.film.episode_id}_POS.jpg`;
  }

  onClick() {
    this.filmNumber = this.storeService.getFilmNumber(this.film.episode_id);
    this.router.navigate(['/movie-details', this.filmNumber]);
  }
}
