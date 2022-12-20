import { Component } from '@angular/core';
import { Character } from '../../models/entities/character';
import { Subscription } from 'rxjs';
import { FilmsService } from '../../services/films.service';
import { Film } from '../../models/entities/film';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { PlanetsService } from '../../services/planets.service';
import { Planet } from '../../models/entities/Planet';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss'],
})
export class CharactersDetailComponent {
  public character: Character | null = null;
  public image: string = '';
  public characterName: string = '';
  public loading: boolean = false;
  public films: Film[] = [];
  public planet: Planet | null = null;
  private routerSubscription: Subscription | null = null;
  private filmSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private storeService: StoreService,
    private planetsService: PlanetsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.readCharacterName();
    this.getCharacter();
    this.storeService.setScrolled(true);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.filmSubscription?.unsubscribe();
  }

  loadImage() {
    if (this.image === '' && this.characterName)
      this.image = `./assets/images/characters/CHA_${this.characterName.replace(
        ' ',
        '_'
      )}.jpg`;
  }

  readCharacterName() {
    this.routerSubscription = this.route.paramMap.subscribe((params) => {
      this.characterName =
        params.get('characterName')?.replace('--', ' ') || '';
    });
  }

  getCharacter() {
    const localObject = localStorage.getItem('Character');
    const localCharacter =
      localObject === undefined || localObject === null
        ? null
        : JSON.parse(localObject);

    if (!localCharacter) {
      this.character = this.storeService.getCharacters(this.characterName)[0];
      if (this.character)
        localStorage.setItem('Character', JSON.stringify(this.character));
    } else {
      this.character = localCharacter as Character;
    }

    this.loadImage();
    this.getPlanet();
    this.getRelatedFilms();
  }

  getRelatedFilms() {
    this.films = this.filmsService.getRelatedFilms(this.character?.films || []);
    this.loading = false;
  }

  getPlanet() {
    this.planetsService
      .getPlanet(this.character?.homeworld || '')
      .subscribe((response) => {
        this.planet = response;
      });
  }
}
