import { Test, TestingModule } from '@nestjs/testing';
import { RunCategoryCatalogService } from './run_category_catalog.service';

describe('RunCategoryCatalogService', () => {
  let service: RunCategoryCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunCategoryCatalogService],
    }).compile();

    service = module.get<RunCategoryCatalogService>(RunCategoryCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
