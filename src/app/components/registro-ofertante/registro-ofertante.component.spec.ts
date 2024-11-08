import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOfertanteComponent } from './registro-ofertante.component';

describe('RegistroOfertanteComponent', () => {
  let component: RegistroOfertanteComponent;
  let fixture: ComponentFixture<RegistroOfertanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroOfertanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroOfertanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
