import { Test, TestingModule } from '@nestjs/testing';
import { RunCategoryCatalogController } from './run_category_catalog.controller';

describe('RunCategoryCatalogController', () => {
  let controller: RunCategoryCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunCategoryCatalogController],
    }).compile();

    controller = module.get<RunCategoryCatalogController>(RunCategoryCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
