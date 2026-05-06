import { Test, TestingModule } from '@nestjs/testing';
import { RunManagementService } from './run_management.service';

describe('RunManagementService', () => {
  let service: RunManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunManagementService],
    }).compile();

    service = module.get<RunManagementService>(RunManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
