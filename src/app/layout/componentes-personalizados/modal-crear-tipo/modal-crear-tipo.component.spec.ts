import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearTipoComponent } from './modal-crear-tipo.component';

describe('ModalCrearTipoComponent', () => {
  let component: ModalCrearTipoComponent;
  let fixture: ComponentFixture<ModalCrearTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
