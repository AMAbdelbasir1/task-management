import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repositrory';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/auth-create.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private JwtService: JwtService,
    ) { }

    signUp(createUserDto: createUserDto) {
        return this.userRepository.signUp(createUserDto);
    }
    async logIn(createUserDto: createUserDto) {
        const username =await this.userRepository.logIn(createUserDto);
       
        const payload = { username };
        const accessToken = this.JwtService.sign(payload);
        return accessToken;
    }
}
