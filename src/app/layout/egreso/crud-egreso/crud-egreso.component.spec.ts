import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEgresoComponent } from './crud-egreso.component';

describe('CrudEgresoComponent', () => {
  let component: CrudEgresoComponent;
  let fixture: ComponentFixture<CrudEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
