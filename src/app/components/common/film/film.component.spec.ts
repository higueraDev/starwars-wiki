import { AppModule } from '../../../app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmComponent } from './film.component';

describe('FilmComponent', () => {
  let component: FilmComponent;
  let fixture: ComponentFixture<FilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('film', {
      title: 'A New Hope', episode_id: 4, opening_crawl: '', director: 'George Lucas',
      producer: 'Gary Kurtz', release_date: '1977-05-25', characters: [], planets: [],
      starships: [], vehicles: [], species: [], created: '', edited: '', url: ''
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('A New Hope');
    expect(component.image).toBe('./assets/images/films/EP4_POS.jpg');
  });
});
