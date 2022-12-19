import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private filmNumbersStore = new BehaviorSubject<string[]>([]);

  readFilmNumbers$ = this.filmNumbersStore.asObservable();

  saveFilmNumbers(numbers: string[]) {
    this.filmNumbersStore.next(numbers);
  }

  getFilmNumber(episode_Id: number) {
    let filmNumber = '';

    this.readFilmNumbers$.pipe(take(1)).subscribe((n) => {
      console.log(n[episode_Id])
      filmNumber = n[episode_Id];
    });

    return filmNumber;
  }
}
