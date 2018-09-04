import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrudIngresoComponent } from './modal-crud-ingreso.component';

describe('ModalCrudIngresoComponent', () => {
  let component: ModalCrudIngresoComponent;
  let fixture: ComponentFixture<ModalCrudIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrudIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrudIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
