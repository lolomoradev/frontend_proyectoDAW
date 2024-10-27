import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDemandanteComponent } from './perfil-demandante.component';

describe('PerfilDemandanteComponent', () => {
  let component: PerfilDemandanteComponent;
  let fixture: ComponentFixture<PerfilDemandanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilDemandanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilDemandanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
