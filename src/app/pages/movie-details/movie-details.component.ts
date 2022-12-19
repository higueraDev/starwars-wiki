import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../models/entities/film';
import { FilmsService } from '../../services/films.service';
import { InterfaceFactoryService } from '../../services/interface-factory.service';
import { FilmDto } from '../../models/dtos/film-dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public film: Film | null = null;
  public image: string = '';
  public filmNumber: string = '';
  private routerSubscription: Subscription | null = null;
  private filmSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private interfaceFactoryService: InterfaceFactoryService
  ) {}

  ngOnInit(): void {
    this.readFilmNumber();
    this.getFilm();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.filmSubscription?.unsubscribe();
  }

  loadImage() {
    if (this.image === '' && this.film)
      this.image = `./assets/images/films/EP${this.film.episode_id}_POS.jpg`;
  }

  readFilmNumber() {
    this.routerSubscription = this.route.paramMap.subscribe((params) => {
      this.filmNumber = params.get('filmNumber') || '';
    });
  }

  getFilm() {
    this.filmSubscription = this.filmsService
      .getFilms(this.filmNumber)
      .subscribe((data) => {
        const isOneFilm = this.interfaceFactoryService.checkInterface<FilmDto>(
          data,
          'episode_id'
        );

        if (isOneFilm && data) {
          this.film = data;
          this.loadImage();
        }
      });
  }
}
