import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/Schemas/user.schemas";

export enum Category {
    ADVENTURE='Adventure',
    CLASSICS='Classics',
    CRIME='Crime',
    FANTASY='Fantasy'
    
}


@Schema({
    timestamps: true
})
export class Book{

    @Prop({
        required:true,unique:true
    })
    title:String;

    @Prop()
    description:String;

    @Prop({required:true})
    author:String

    @Prop()
    price:number

    @Prop()
    category:Category
    

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    user:User

}

export const BookSchema = SchemaFactory.createForClass(Book)