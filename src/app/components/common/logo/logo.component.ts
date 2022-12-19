import { Component, Input, OnDestroy } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnDestroy {
  public overlayOpacity: number = 0;
  public title = 'Star Wars';
  public subtitle = 'Wiki';
  scrolledSubscription: Subscription | null = null;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.scrolledSubscription = this.storeService.readIsScrolled$.subscribe(
      (value) => {
        this.overlayOpacity = value ? 1 : 0;
      }
    );
  }

  ngOnDestroy(): void {
    this.scrolledSubscription?.unsubscribe();
  }
}
