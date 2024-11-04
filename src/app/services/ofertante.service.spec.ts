import { TestBed } from '@angular/core/testing';

import { OfertanteService } from './ofertante.service';

describe('OfertanteService', () => {
  let service: OfertanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
