import { Test, TestingModule } from '@nestjs/testing';
import { RunCategoryCatalogManagementController } from './run_category_catalog_management.controller';

describe('RunCategoryCatalogManagementController', () => {
  let controller: RunCategoryCatalogManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunCategoryCatalogManagementController],
    }).compile();

    controller = module.get<RunCategoryCatalogManagementController>(RunCategoryCatalogManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
