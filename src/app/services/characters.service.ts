import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterDto } from '../models/dtos/character';
import { take } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient, private storeService: StoreService) {}

  getCharacters(characterUrls: string[] = []) {
    const arr: CharacterDto[] = [];
    characterUrls.forEach((character) =>
      this.http
        .get<CharacterDto>(character)
        .pipe(take(1))
        .subscribe((response) => {
          arr.push(response);
        })
    );
    this.storeService.saveCharacters(arr);
    return arr;
  }
}
