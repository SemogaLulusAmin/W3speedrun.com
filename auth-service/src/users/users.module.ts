import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
    JwtModule.register({
      secret: "MOST_SECRET_2026",
      signOptions: { expiresIn: '7d'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {

}
