import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCatalogComponent } from './film-catalog.component';

describe('FilmCatalogComponent', () => {
  let component: FilmCatalogComponent;
  let fixture: ComponentFixture<FilmCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
