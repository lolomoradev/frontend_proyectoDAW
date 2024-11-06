import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOfertanteComponent } from './home-ofertante.component';

describe('HomeOfertanteComponent', () => {
  let component: HomeOfertanteComponent;
  let fixture: ComponentFixture<HomeOfertanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOfertanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeOfertanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
