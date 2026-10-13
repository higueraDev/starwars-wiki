import { Component, Input, OnDestroy } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnDestroy {
  private saberAudio = new Audio('./assets/audio/saber-ignite.wav');
  public overlayOpacity: number = 0;
  public isHomePage: boolean = false;
  public title = 'Star Wars';
  public subtitle = 'Wiki';
  scrolledSubscription: Subscription | null = null;
  homePageSubscription: Subscription | null = null;

  constructor(private storeService: StoreService) {}

  playSaberSound(): void {
    this.storeService.requestHeroReturn();
    this.saberAudio.currentTime = 0;
    void this.saberAudio.play().catch(() => undefined);
  }

  ngOnInit() {
    this.scrolledSubscription = this.storeService.readIsScrolled$.subscribe(
      (value) => {
        this.overlayOpacity = value ? 1 : 0;
      }
    );
    this.homePageSubscription = this.storeService.readIsHomePage$.subscribe(
      (value) => {
        this.isHomePage = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.scrolledSubscription?.unsubscribe();
    this.homePageSubscription?.unsubscribe();
    this.saberAudio.pause();
  }
}
