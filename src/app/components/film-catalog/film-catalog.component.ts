import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Film } from '../../models/entities/film';
import { SortOptions } from '../../models/enums/sort-options';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-film-catalog',
  templateUrl: './film-catalog.component.html',
  styleUrls: ['./film-catalog.component.scss'],
})
export class FilmCatalogComponent implements OnInit {
  @ViewChild('catalogSection') catalogSection!: ElementRef<HTMLElement>;

  public films: Film[] = [];
  public loading: boolean = false;

  constructor(private filmsService: FilmsService) {}

  ngOnInit() {
    this.loading = true;
    this.getFilms();
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
        ? convertTime(b.release_date) - convertTime(a.release_date)
        : convertTime(a.release_date) - convertTime(b.release_date)
    );
  }

  getFilms() {
    this.filmsService.getFilms().subscribe(({ results }) => {
      if (results.length > 0)
        this.films = this.sortFilms(true, SortOptions.EPISODE, results);
      this.loading = false;
    });
  }
}
