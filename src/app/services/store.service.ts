import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Character } from '../models/entities/character';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private filmNumbersStore = new BehaviorSubject<string[]>([]);
  readFilmNumbers$ = this.filmNumbersStore.asObservable();

  private isScrolledStore = new BehaviorSubject<boolean>(false);
  readIsScrolled$ = this.isScrolledStore.asObservable();

  private isHomePageStore = new BehaviorSubject<boolean>(false);
  readIsHomePage$ = this.isHomePageStore.asObservable();
  private heroReturnRequested = false;

  private starSpeedStore = new BehaviorSubject<number>(1);
  readStarSpeed$ = this.starSpeedStore.asObservable();

  private charactersStore = new BehaviorSubject<Character[]>([]);
  readCharacters$ = this.charactersStore.asObservable();

  saveFilmNumbers(numbers: string[]) {
    this.filmNumbersStore.next(numbers);
  }

  saveCharacters(characters: Character[]) {
    this.charactersStore.next(characters);
  }

  getFilmNumber(episode_Id: number) {
    let filmNumber = '';

    this.readFilmNumbers$.pipe(take(1)).subscribe((n) => {
      filmNumber = n[episode_Id];
    });

    return filmNumber;
  }

  setScrolled(value: boolean) {
    this.isScrolledStore.next(value);
  }

  setIsHomePage(value: boolean) {
    this.isHomePageStore.next(value);
  }

  setStarSpeed(value: number): void {
    this.starSpeedStore.next(value);
  }

  requestHeroReturn(): void {
    this.heroReturnRequested = true;
  }

  consumeHeroReturn(): boolean {
    const requested = this.heroReturnRequested;
    this.heroReturnRequested = false;
    return requested;
  }

  getCharacters(characterName: string = '') {
    let arr: Character[] = [];
    this.readCharacters$.pipe(take(1)).subscribe((characters) => {
      arr = characters;
    });
    const found = arr.find((c) => c.name === characterName);
    return found ? [found] : arr;
  }
}
