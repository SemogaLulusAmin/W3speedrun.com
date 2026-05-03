import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService,private jwtService: JwtService) {}

    async findAll(role?: 'USER' | 'ADMIN'){
        if(role){
            const user = await this.prisma.user.findMany({
                where: {role}
            })
            return user;
        }
        const user = await this.prisma.user.findMany();
        return user;
    }

    async findOne(id: string){
        const user = await this.prisma.user.findUnique({
            where: {
                user_id : id
            }
        })
    }

    async register(users: { username: string, email: string, country: string, password: string}){

        const userEmail = await this.prisma.user.findUnique({
            where: {
                email : users.email
            }
        })

        if(userEmail){
            throw new ConflictException('Email has been registered!')
        }

        const hashPassword = bcrypt.hashSync(users.password, 7);
        const userID = crypto.randomUUID();

        return this.prisma.user.create({
            data: {
                user_id: userID,
                username: users.username,
                country: users.country,
                email: users.email,
                password: hashPassword
            }
        })

    }

    async login(users: { email: string, password: string}){
        const user = await this.prisma.user.findUnique({
            where: {
                email : users.email
            }
        })

        if(!user){
            throw new UnauthorizedException('invalid email or password');
        }

        const isPasswordValid = bcrypt.compareSync(users.password, user.password);
        
        if(!isPasswordValid){
            throw new UnauthorizedException('invalid email or password')
        }

        const payload = {
            id: user.user_id,
            role: user.role
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
