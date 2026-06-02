import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthGatewayController } from './auth-gateway/auth-gateway.controller';
import { GameGatewayController } from './game-gateway/game-gateway.controller';
import { RunGatewayController } from './run-gateway/run-gateway.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    JwtModule.register({
        secret: process.env.JWT_SECRET
    }),
  ],
  controllers: [AppController, AuthGatewayController, GameGatewayController, RunGatewayController],
  providers: [AppService],
})
export class AppModule {}
