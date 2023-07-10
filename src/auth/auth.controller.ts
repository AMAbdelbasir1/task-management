import { Controller, Post, Body, ValidationPipe, UsePipes, UseGuards, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/auth-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './auth.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private userServise: AuthService) { }
    @Post('/signup')
    @UsePipes(ValidationPipe)
    NewUser(@Body() body: createUserDto) {
        //console.log(body);
        return this.userServise.signUp(body);
    }
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    @UsePipes(ValidationPipe)
    async signIn(@Body() body: createUserDto, @Res() res) {
        //console.log(body);
        const token = await this.userServise.logIn(body);
        return res.status(200).json({ token });
    }
    @Post('/getme')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User, @Res() res) {
        const { username, tasks } = user;
        return res.status(200).json({ username, tasks });
    }
}
