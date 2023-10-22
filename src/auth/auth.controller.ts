import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './DTO/signup.dto';
import { LoginDTO } from './DTO/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post("/Signup")
    Signup(@Body() signupDto:SignUpDTO):Promise<{token :String}>
    {
        return this.authService.signUp(signupDto)
    }

    @Post("/Login")
    Login(@Body() loginDTO:LoginDTO):Promise<{token:String}>{
        return this.authService.login(loginDTO);
    }
}
