import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerReporteComponent } from './modal-ver-reporte.component';

describe('ModalVerReporteComponent', () => {
  let component: ModalVerReporteComponent;
  let fixture: ComponentFixture<ModalVerReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVerReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
