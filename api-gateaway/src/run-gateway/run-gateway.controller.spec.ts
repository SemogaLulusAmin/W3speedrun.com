import { Test, TestingModule } from '@nestjs/testing';
import { RunGatewayController } from './run-gateway.controller';

describe('RunGatewayController', () => {
  let controller: RunGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunGatewayController],
    }).compile();

    controller = module.get<RunGatewayController>(RunGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
