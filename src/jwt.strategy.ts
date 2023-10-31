import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./auth/Schemas/user.schemas";
import { Model } from "mongoose";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
                secretOrKey: process.env.JWT_SECRET 
            });
        }
}
