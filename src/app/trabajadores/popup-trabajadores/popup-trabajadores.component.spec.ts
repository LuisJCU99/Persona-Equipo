import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTrabajadoresComponent } from './popup-trabajadores.component';

describe('PopupTrabajadoresComponent', () => {
  let component: PopupTrabajadoresComponent;
  let fixture: ComponentFixture<PopupTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTrabajadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
