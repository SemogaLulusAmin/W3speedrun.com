import { Test, TestingModule } from '@nestjs/testing';
import { GameCatalogService } from './game_catalog.service';

describe('GameCatalogService', () => {
  let service: GameCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameCatalogService],
    }).compile();

    service = module.get<GameCatalogService>(GameCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
