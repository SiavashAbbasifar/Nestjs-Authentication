import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps:true
}) export class User extends Document{

    @Prop()
    name:String

    @Prop({unique:[true , 'Email has already been registered']})
    email:String

    @Prop()
    password:String
}

export const UserSchema = SchemaFactory.createForClass(User)