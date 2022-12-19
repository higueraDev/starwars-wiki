import { Component } from '@angular/core';
import { Character } from '../../models/entities/character';
import { Subscription } from 'rxjs';
import { FilmsService } from '../../services/films.service';
import { Film } from '../../models/entities/film';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';

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
  private routerSubscription: Subscription | null = null;
  private filmSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private storeService: StoreService
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
      this.image = `./assets/images/characters/CHA_${this.characterName.replace(' ','_')}.jpg`;
  }

  readCharacterName() {
    this.routerSubscription = this.route.paramMap.subscribe((params) => {
      this.characterName =
        params.get('characterName')?.replace('--', ' ') || '';
    });
  }

  getCharacter() {
    this.character = this.storeService.getCharacters(this.characterName)[0];
    this.loadImage()
    this.getRelatedFilms();
  }

  getRelatedFilms() {
    this.films = this.filmsService.getRelatedFilms(this.character?.films || []);
    this.loading = false;
  }
}
