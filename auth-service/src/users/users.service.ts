import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService,private jwtService: JwtService) {}

    async findAll(role?: 'USER' | 'ADMIN'){
        try{
            if(role){
                const user = await this.prisma.user.findMany({
                    where: {role}
                })
                return user;
            }
            const user = await this.prisma.user.findMany();
            return user;
        } catch(error){
            throw error;
        }
    }

    async findOne(id: string){
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    user_id : id
                }
            })
        }catch (error){
            throw error;
        }
    }

    async register(users: { username: string, email: string, country: string, password: string}){

        try{
            const userEmail = await this.prisma.user.findUnique({
                where: {
                    email : users.email
                }
            })

            if(userEmail){
                throw new ConflictException('Email has been registered!')
            }

            const salt = 'IKAN_APA_YANG_TERINDAH'; 
            const hashPassword = pbkdf2Sync(users.password, salt, 1000, 27, 'sha256').toString('hex');
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
        } catch(error){
            throw error;
        }

    }

    async login(users: { email: string, password: string }){
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    email : users.email
                }
            })

            console.log(user);

            if(!user){
                throw new UnauthorizedException('invalid email or password');
            }
            
            const salt = 'IKAN_APA_YANG_TERINDAH'; 
            const hashPassword = pbkdf2Sync(users.password, salt, 1000, 27, 'sha256').toString('hex');

            console.log(hashPassword)
            if(user.password !== hashPassword){
                throw new UnauthorizedException('invalid email or password')
            }

            const payload = {
                id: user.user_id,
                role: user.role
            }

            return {
                token: this.jwtService.sign(payload)
            }
        } catch(error){
            throw error;
        }
    }

    async updateUsername(id : string, users : {username: string}){
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    user_id : id
                }
            })

            const updatedUser = await this.prisma.user.update({
                where: {
                    user_id : id
                },
                data: {
                    username : users.username
                }
            })

            return {
                user: updatedUser
            }
        } catch (error){
            throw error;
        }
    }
    
}
