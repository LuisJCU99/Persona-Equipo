import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCaixaComponent } from './usuarios-caixa.component';

describe('UsuariosCaixaComponent', () => {
  let component: UsuariosCaixaComponent;
  let fixture: ComponentFixture<UsuariosCaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosCaixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
