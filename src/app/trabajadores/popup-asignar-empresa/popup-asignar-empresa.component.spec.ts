import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAsignarEmpresaComponent } from './popup-asignar-empresa.component';

describe('PopupAsignarEmpresaComponent', () => {
  let component: PopupAsignarEmpresaComponent;
  let fixture: ComponentFixture<PopupAsignarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAsignarEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAsignarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
