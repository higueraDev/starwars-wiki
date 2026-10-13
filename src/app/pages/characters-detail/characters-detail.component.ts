import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  @ViewChild('planetTrigger') private planetTrigger?: ElementRef<HTMLElement>;
  @ViewChild('planetPanel') private planetPanel?: ElementRef<HTMLElement>;
  public character: Character | null = null;
  public image: string = '';
  public characterName: string = '';
  public parentFilmNumber: string | null = null;
  public loading: boolean = false;
  public films: Film[] = [];
  public planet: Planet | null = null;
  public showPlanet: boolean = false;
  public planetPanelTop = 0;
  public planetPanelLeft = 0;
  private positionFrame: number | null = null;
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
    this.parentFilmNumber = this.route.snapshot.queryParamMap.get('fromFilm');
    this.readCharacterName();
    this.getCharacter();
    this.storeService.setScrolled(true);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.filmSubscription?.unsubscribe();
    if (this.positionFrame !== null) cancelAnimationFrame(this.positionFrame);
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

  togglePlanet() {
    this.showPlanet = !this.showPlanet;
    if (this.showPlanet) this.schedulePlanetPosition();
  }

  private schedulePlanetPosition(): void {
    if (this.positionFrame !== null) cancelAnimationFrame(this.positionFrame);
    this.positionFrame = requestAnimationFrame(() => {
      this.positionFrame = null;
      const trigger = this.planetTrigger?.nativeElement;
      const panel = this.planetPanel?.nativeElement;
      if (!trigger || !panel || !this.showPlanet) return;
      const triggerBounds = trigger.getBoundingClientRect();
      const panelBounds = panel.getBoundingClientRect();
      const gap = 10;
      const spaceBelow = window.innerHeight - triggerBounds.bottom;
      const preferredTop = spaceBelow >= panelBounds.height + gap
        ? triggerBounds.bottom + gap
        : triggerBounds.top - panelBounds.height - gap;
      this.planetPanelTop = Math.max(12, Math.min(preferredTop, window.innerHeight - panelBounds.height - 12));
      this.planetPanelLeft = Math.max(12, Math.min(triggerBounds.left, window.innerWidth - panelBounds.width - 12));
    });
  }

  onCharacterScroll(): void {
    if (this.showPlanet) this.schedulePlanetPosition();
  }

  @HostListener('document:pointerdown', ['$event'])
  onOutsidePointerDown(event: PointerEvent): void {
    if (!this.showPlanet) return;
    const target = event.target as Node;
    if (this.planetTrigger?.nativeElement.contains(target) || this.planetPanel?.nativeElement.contains(target)) return;
    this.showPlanet = false;
  }

  @HostListener('document:focusin', ['$event'])
  onFocusOutside(event: FocusEvent): void {
    if (!this.showPlanet) return;
    const target = event.target as Node;
    if (this.planetTrigger?.nativeElement.contains(target) || this.planetPanel?.nativeElement.contains(target)) return;
    this.showPlanet = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.showPlanet = false;
  }
}
