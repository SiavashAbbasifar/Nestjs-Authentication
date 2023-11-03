import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, } from "class-validator";
import { Category } from "../Schemas/bookSchema";
import { User } from "src/auth/Schemas/user.schemas";

export class createABookDTO{
    @IsNotEmpty()
    @IsString()
    readonly title:String;

    @IsNotEmpty()
    @IsString()
    readonly description:String;

    @IsNotEmpty()
    @IsString()
    readonly author:String;

    @IsNotEmpty()
    @IsNumber()
    readonly price:number;

    @IsNotEmpty()
    @IsEnum(Category,{message:"Please choose a category"})
    readonly category:Category;

    @IsEmpty({message:"You cannot pass an user id"})
    readonly user:User

}