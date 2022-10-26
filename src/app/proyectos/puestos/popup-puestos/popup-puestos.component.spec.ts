import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPuestosComponent } from './popup-puestos.component';

describe('PopupPuestosComponent', () => {
  let component: PopupPuestosComponent;
  let fixture: ComponentFixture<PopupPuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPuestosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
