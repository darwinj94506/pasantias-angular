import { TipoMaterialModule } from './tipo-material.module';

describe('TipoMaterialModule', () => {
  let tipoMaterialModule: TipoMaterialModule;

  beforeEach(() => {
    tipoMaterialModule = new TipoMaterialModule();
  });

  it('should create an instance', () => {
    expect(tipoMaterialModule).toBeTruthy();
  });
});
