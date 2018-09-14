import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerDetalleComponent } from './modal-ver-detalle.component';

describe('ModalVerDetalleComponent', () => {
  let component: ModalVerDetalleComponent;
  let fixture: ComponentFixture<ModalVerDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVerDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
