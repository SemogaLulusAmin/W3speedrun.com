import { Controller, Get, Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
@ApiTags('User')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get(':id/profile')
    async FindOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }

}
