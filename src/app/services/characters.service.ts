import { Injectable } from '@angular/core';
import { apiUrl } from '../../api/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(characterUrl: string = '') {
    return this.http.get(apiUrl(characterUrl).peopleUrl);
  }
}
