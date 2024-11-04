import { TestBed } from '@angular/core/testing';

import { ActividadDemandanteService } from './actividad-demandante.service';

describe('ActividadDemandanteService', () => {
  let service: ActividadDemandanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadDemandanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
