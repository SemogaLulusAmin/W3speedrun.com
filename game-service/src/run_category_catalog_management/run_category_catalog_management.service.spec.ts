import { Test, TestingModule } from '@nestjs/testing';
import { RunCategoryCatalogManagementService } from './run_category_catalog_management.service';

describe('RunCategoryCatalogManagementService', () => {
  let service: RunCategoryCatalogManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunCategoryCatalogManagementService],
    }).compile();

    service = module.get<RunCategoryCatalogManagementService>(RunCategoryCatalogManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
