import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUsuariosCaixaComponent } from './popup-usuarios-caixa.component';

describe('PopupUsuariosCaixaComponent', () => {
  let component: PopupUsuariosCaixaComponent;
  let fixture: ComponentFixture<PopupUsuariosCaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUsuariosCaixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUsuariosCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
