import { Test, TestingModule } from '@nestjs/testing';
import { GameManagementController } from './game_management.controller';

describe('GameManagementController', () => {
  let controller: GameManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameManagementController],
    }).compile();

    controller = module.get<GameManagementController>(GameManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
