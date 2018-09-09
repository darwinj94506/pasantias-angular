import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEgresoComponent } from './listar-egreso.component';

describe('ListarEgresoComponent', () => {
  let component: ListarEgresoComponent;
  let fixture: ComponentFixture<ListarEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
