import { TestBed } from '@angular/core/testing';

import { ActividadDemandanteServiceService } from './actividad-demandante-service.service';

describe('ActividadDemandanteServiceService', () => {
  let service: ActividadDemandanteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadDemandanteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
