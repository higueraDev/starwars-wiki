import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../models/entities/film';
import { FilmsService } from '../../services/films.service';
import { InterfaceFactoryService } from '../../services/interface-factory.service';
import { FilmDto } from '../../models/dtos/film-dto';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../models/entities/character';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public film: Film | null = null;
  public image: string = '';
  public filmNumber: string = '';
  public characters: Character[] = [];
  public loading: boolean = false;
  private routerSubscription: Subscription | null = null;
  private filmSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmsService: FilmsService,
    private interfaceFactoryService: InterfaceFactoryService,
    private storeService: StoreService,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.readFilmNumber();
    this.getFilm();
    this.storeService.setScrolled(true);
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
          this.getCharacters();
          this.loadImage();
        }
      });
  }

  getCharacters() {
    this.charactersService.getCharacters(this.film?.characters || []);
    this.characters = this.storeService.getCharacters();
    this.loading = false;
  }

  onCharacterClick(name: string) {
    const formattedName = name.replace(' ', '--');
    this.router.navigate(['/character-details', formattedName]);
  }
}
