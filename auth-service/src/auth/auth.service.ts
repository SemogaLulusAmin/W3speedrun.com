import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private prisma : PrismaService, private jwtService: JwtService) {}
    
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
    
                await this.prisma.user.create({
                    data: {
                        user_id: userID,
                        username: users.username,
                        country: users.country,
                        email: users.email,
                        password: hashPassword
                    }
                })

                return {
                    message: "Register is successfully"
                }
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
    

}
