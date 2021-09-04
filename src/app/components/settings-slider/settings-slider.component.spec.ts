import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSliderComponent } from './settings-slider.component';

describe('SettingsSliderComponent', () => {
  let component: SettingsSliderComponent;
  let fixture: ComponentFixture<SettingsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
