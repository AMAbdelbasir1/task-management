import { Repository } from 'typeorm';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { User } from './user.entity';
import { createUserDto } from './dto/auth-create.dto';
import {
    ConflictException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(data: createUserDto) {
        const { username, password } = data;
        const salt: string = await bcrypt.genSalt();
        const newUser = new User();
        newUser.username = username;
        newUser.salt = salt;
        newUser.password = await this.hashPass(password, salt);
        try {
            await newUser.save();
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('username used berfore');
            } else {
                console.log(err);
                throw new InternalServerErrorException();
            }
        }
    }
    async logIn(data: createUserDto) {
        const { username, password } = data;
        const user = await this.findOne({ where: { username } });
        if (!user) {
            throw new UnauthorizedException(
                'user name not found . please signUp and return',
            );
        }
        const hash = await this.hashPass(password, user.salt);
        // console.log(hash);
        // console.log(user.password);
        const checkPass = this.checkPass(user.password, hash);
        console.log(checkPass);
        if (!checkPass) {
            throw new UnauthorizedException('password not matched');
        }

        return user.username;
    }
    private hashPass(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
    private checkPass(password: string, hash: string) {
        return password === hash;
    }
}
