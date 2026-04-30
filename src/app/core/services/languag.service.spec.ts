import { TestBed } from '@angular/core/testing';

import { LanguagService } from './languag.service';

describe('LanguagService', () => {
  let service: LanguagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
