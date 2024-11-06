import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDemandanteComponent } from './home-demandante.component';

describe('HomeDemandanteComponent', () => {
  let component: HomeDemandanteComponent;
  let fixture: ComponentFixture<HomeDemandanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDemandanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeDemandanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
