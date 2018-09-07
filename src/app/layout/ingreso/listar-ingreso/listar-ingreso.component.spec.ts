import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIngresoComponent } from './listar-ingreso.component';

describe('ListarIngresoComponent', () => {
  let component: ListarIngresoComponent;
  let fixture: ComponentFixture<ListarIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
