import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./auth/Schemas/user.schemas";
import { Model } from "mongoose";
import { JwtModule } from "@nestjs/jwt";
import { config } from "dotenv";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey:process.env.JWT_SECRET
            });
        }

        async validate(payload){
            const{id}=payload
            const user = await this.userModel.findById(id)
            if(!user){
                throw new UnauthorizedException("You have to login first")
            }
            return user
        }
}
