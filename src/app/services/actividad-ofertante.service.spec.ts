import { TestBed } from '@angular/core/testing';

import { ActividadOfertanteService } from './actividad-ofertante.service';

describe('ActividadOfertanteService', () => {
  let service: ActividadOfertanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadOfertanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
