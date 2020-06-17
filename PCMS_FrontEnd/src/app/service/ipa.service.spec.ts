import { TestBed } from '@angular/core/testing';

import { IpaService } from './ipa.service';

describe('IpaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpaService = TestBed.get(IpaService);
    expect(service).toBeTruthy();
  });
});
