import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSectionLoginComponent } from './info-section-login.component';

describe('InfoSectionLoginComponent', () => {
  let component: InfoSectionLoginComponent;
  let fixture: ComponentFixture<InfoSectionLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoSectionLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoSectionLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
