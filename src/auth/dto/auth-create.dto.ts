import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class createUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string ;
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(16)
   // @Matches(`^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~+-=|\]).*$`)
    password: string;
}