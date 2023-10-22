import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO{
    @IsNotEmpty()
    @IsEmail({},{message:"Please Enter A Valid Email Address: "})
    @IsString()
    readonly email: String

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    readonly password:String
}