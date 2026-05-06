import { Test, TestingModule } from '@nestjs/testing';
import { RunManagementController } from './run_management.controller';

describe('RunManagementController', () => {
  let controller: RunManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunManagementController],
    }).compile();

    controller = module.get<RunManagementController>(RunManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
