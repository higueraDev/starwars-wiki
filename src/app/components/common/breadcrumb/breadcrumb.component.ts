import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  public currentPage = '';
  public parentFilmNumber: string | null = null;
  private navigationSubscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateBreadcrumbs();
    this.navigationSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumbs());
  }

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();
  }

  private updateBreadcrumbs(): void {
    const route = this.router.routerState.snapshot.root.firstChild;
    const title = route?.data['breadcrumbTitle'];
    this.currentPage = title && title !== 'Home' ? title : '';
    this.parentFilmNumber = this.currentPage === 'Character Details'
      ? route?.queryParamMap.get('fromFilm') || null
      : null;
  }
}
