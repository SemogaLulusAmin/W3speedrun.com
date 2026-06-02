import { Test, TestingModule } from '@nestjs/testing';
import { AuthGatewayController } from './auth-gateway.controller';

describe('AuthGatewayController', () => {
  let controller: AuthGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthGatewayController],
    }).compile();

    controller = module.get<AuthGatewayController>(AuthGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
