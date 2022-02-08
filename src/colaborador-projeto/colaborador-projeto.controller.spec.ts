import { Test, TestingModule } from '@nestjs/testing';
import { ColaboradorProjetoController } from './colaborador-projeto.controller';

describe('ColaboradorProjetoController', () => {
  let controller: ColaboradorProjetoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColaboradorProjetoController],
    }).compile();

    controller = module.get<ColaboradorProjetoController>(ColaboradorProjetoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
