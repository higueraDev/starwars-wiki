import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../api/api';
import { FilmsDto } from '../models/dtos/films-dto';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  getFilms() {
    return this.http.get<FilmsDto>(apiUrl().filmsUrl);
  }
}
