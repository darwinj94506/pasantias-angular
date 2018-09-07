import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrudUsuarioComponent } from './modal-crud-usuario.component';

describe('ModalCrudUsuarioComponent', () => {
  let component: ModalCrudUsuarioComponent;
  let fixture: ComponentFixture<ModalCrudUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrudUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrudUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
