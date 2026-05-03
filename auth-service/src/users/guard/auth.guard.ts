import { Injectable, CanActivate, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthToken implements CanActivate{

    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedException('Missing token!')
        }

        const token = authHeader.split(' ')[1];

        try{    
            
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            })

            req['user'] = payload;

            return true;
        }catch(error){
            throw new UnauthorizedException(`error: ${error}`)
        }
    }
}

@Injectable()
export class isAdmin implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req['user'];

        if(user.role !== 'admin'){
            throw new UnauthorizedException('Forbidden area, for staff only');
        }

        return true;
    }
}