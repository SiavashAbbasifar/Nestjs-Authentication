import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/Schemas/user.schemas';
import * as bcrypt from 'bcryptjs';
import { SignUpDTO } from './DTO/signup.dto';
import { LoginDTO } from './DTO/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
   // private configService: ConfigService
  ) {}

  async signUp(signUpDTO:SignUpDTO):Promise<{token:String}> {
    const { name, email, password } = signUpDTO;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({
      id: user._id,
    });
    return { token };
  }

  async login(loginDTO:LoginDTO):Promise<{token:String}>{
    const {email,password} =loginDTO;
    const user= await this.userModel.findOne({email})
    if(!user){
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordMatched = await bcrypt.compare(password.toString(), user.password.toString())
    if(!isPasswordMatched){
      throw new UnauthorizedException('Invalid Credentials')
    }

    const token = this.jwtService.sign({
      id: user._id,
    });
    return { token };
  }

}
