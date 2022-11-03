import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOrdenadoresComponent } from './popup-ordenadores.component';

describe('PopupOrdenadoresComponent', () => {
  let component: PopupOrdenadoresComponent;
  let fixture: ComponentFixture<PopupOrdenadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupOrdenadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupOrdenadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
