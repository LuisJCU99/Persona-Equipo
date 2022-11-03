import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionesComponent } from './extensiones.component';

describe('ExtensionesComponent', () => {
  let component: ExtensionesComponent;
  let fixture: ComponentFixture<ExtensionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
