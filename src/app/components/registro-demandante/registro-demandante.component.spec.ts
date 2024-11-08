import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDemandanteComponent } from './registro-demandante.component';

describe('RegistroDemandanteComponent', () => {
  let component: RegistroDemandanteComponent;
  let fixture: ComponentFixture<RegistroDemandanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDemandanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroDemandanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
