import { TestBed } from '@angular/core/testing';

import { LoginYregistroService } from './login-yregistro.service';

describe('LoginYregistroService', () => {
  let service: LoginYregistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginYregistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
