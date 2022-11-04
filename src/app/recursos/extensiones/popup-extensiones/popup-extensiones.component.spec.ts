import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExtensionesComponent } from './popup-extensiones.component';

describe('PopupExtensionesComponent', () => {
  let component: PopupExtensionesComponent;
  let fixture: ComponentFixture<PopupExtensionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupExtensionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupExtensionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
