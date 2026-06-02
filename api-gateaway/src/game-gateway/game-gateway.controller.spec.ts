import { Test, TestingModule } from '@nestjs/testing';
import { GameGatewayController } from './game-gateway.controller';

describe('GameGatewayController', () => {
  let controller: GameGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameGatewayController],
    }).compile();

    controller = module.get<GameGatewayController>(GameGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
