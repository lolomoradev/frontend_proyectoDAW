import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilOfertanteComponent } from './perfil-ofertante.component';

describe('PerfilOfertanteComponent', () => {
  let component: PerfilOfertanteComponent;
  let fixture: ComponentFixture<PerfilOfertanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilOfertanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilOfertanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
