import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt.interface'
import { UserRepository } from './user.repositrory';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private UserRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secretPass12345@$%^"
        })
    }
    async validate(payload: JwtPayload) {
        const { username } = payload;
        const user = await this.UserRepository.findOne({ where: { username } });
        if (!user) {
            throw new UnauthorizedException()
        }
       // console.log(user);
        return user;
    }
}