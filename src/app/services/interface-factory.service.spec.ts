import { TestBed } from '@angular/core/testing';

import { InterfaceFactoryService } from './interface-factory.service';

describe('InterfaceFactoryService', () => {
  let service: InterfaceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
