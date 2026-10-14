import { AppModule } from '../app.module';
import { TestBed } from '@angular/core/testing';

import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [AppModule],});
    service = TestBed.inject(FilmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
