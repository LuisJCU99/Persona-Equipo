import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSmartphonesComponent } from './popup-smartphones.component';

describe('PopupSmartphonesComponent', () => {
  let component: PopupSmartphonesComponent;
  let fixture: ComponentFixture<PopupSmartphonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSmartphonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupSmartphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
