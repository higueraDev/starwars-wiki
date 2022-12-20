import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';
import { ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof ActivationEnd),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        const d = data as ActivationEnd;
        this.handleBreadcrumb(d.snapshot.data['breadcrumbTitle']);
      });
  }

  handleBreadcrumb(title: string) {
    if (title !== 'Home') this.breadcrumbs = this.breadcrumbs + ' / ' + title;
    else this.breadcrumbs = '';
  }
}
