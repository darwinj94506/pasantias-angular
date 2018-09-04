import { IngresoModule } from './ingreso.module';

describe('IngresoModule', () => {
  let ingresoModule: IngresoModule;

  beforeEach(() => {
    ingresoModule = new IngresoModule();
  });

  it('should create an instance', () => {
    expect(ingresoModule).toBeTruthy();
  });
});
