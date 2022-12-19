import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Film } from '../../../models/entities/film';
import { SortOptions } from '../../../models/enums/sort-options';
import { FilmsService } from '../../../services/films.service';
import { FilmsDto } from '../../../models/dtos/films-dto';
import { InterfaceFactoryService } from '../../../services/interface-factory.service';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-film-catalog',
  templateUrl: './film-catalog.component.html',
  styleUrls: ['./film-catalog.component.scss'],
})
export class FilmCatalogComponent implements OnInit, OnDestroy {
  @ViewChild('catalogSection') catalogSection!: ElementRef<HTMLElement>;

  public films: Film[] = [];
  public loading: boolean = false;

  private filmsSubscription: Subscription | null = null;

  constructor(
    private filmsService: FilmsService,
    private interfaceFactoryService: InterfaceFactoryService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getFilms();
  }

  ngOnDestroy(): void {
    this.filmsSubscription?.unsubscribe();
  }

  onSortChange({ sort, isAsc }: { sort: string; isAsc: boolean }) {
    this.films = this.sortFilms(isAsc, sort);
  }

  sortFilms(isAsc: boolean, filter: string, films: Film[] = []) {
    const isEpisode = filter === SortOptions.EPISODE;
    const convertTime = (stringDate: string) => new Date(stringDate).getTime();
    const data = films.length > 0 ? films : [...this.films];

    return data.sort((a, b) =>
      isEpisode
        ? isAsc
          ? a.episode_id - b.episode_id
          : b.episode_id - a.episode_id
        : isAsc
        ? convertTime(a.release_date) - convertTime(b.release_date)
        : convertTime(b.release_date) - convertTime(a.release_date)
    );
  }

  getFilms() {
    this.filmsSubscription = this.filmsService.getFilms().subscribe((data) => {
      const allFilms = this.interfaceFactoryService.checkInterface<FilmsDto>(
        data,
        'results'
      );
      if (allFilms)
        if (data.results.length > 0) {
          this.films = this.sortFilms(true, SortOptions.RELEASE, data.results);
          this.saveFilmNumbers();
        }
      this.loading = false;
    });
  }

  saveFilmNumbers() {
    const arr: string[] = [];
    this.films.map((film, i) => {
      arr[film.episode_id] = (i + 1).toString();
    });
    this.storeService.saveFilmNumbers(arr);
  }
}
