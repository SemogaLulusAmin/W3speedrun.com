import { Test, TestingModule } from '@nestjs/testing';
import { GameCatalogController } from './game_catalog.controller';

describe('GameCatalogController', () => {
  let controller: GameCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameCatalogController],
    }).compile();

    controller = module.get<GameCatalogController>(GameCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
