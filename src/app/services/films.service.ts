import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
