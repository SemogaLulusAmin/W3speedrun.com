import { Injectable} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async findOne(id: string){
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    user_id : id
                }
            })

            return {
                username: user?.username,
                email: user?.email,
                country: user?.country,
                role: user?.role
            }
        }catch (error){
            throw error;
        }
    }
    
}
