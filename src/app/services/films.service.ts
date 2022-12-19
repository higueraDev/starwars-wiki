import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { apiUrl } from '../../api/api';
import { FilmDto } from '../models/dtos/film-dto';
import { FilmsDto } from '../models/dtos/films-dto';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  getFilms(episodeId: string = '') {
    return this.http.get<FilmDto | FilmsDto>(apiUrl(episodeId).filmsUrl);
  }

  getRelatedFilms(films: string[]) {
    const arr: FilmDto[] = [];
    films.forEach((film) =>
      this.http
        .get<FilmDto>(film)
        .pipe(take(1))
        .subscribe((response) => {
          arr.push(response);
        })
    );
    return arr;
  }
}
