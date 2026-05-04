import { Test, TestingModule } from '@nestjs/testing';
import { GameManagementService } from './game_management.service';

describe('GameManagementService', () => {
  let service: GameManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameManagementService],
    }).compile();

    service = module.get<GameManagementService>(GameManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
