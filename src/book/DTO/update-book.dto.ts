import { User } from "src/auth/Schemas/user.schemas";
import { Category } from "../Schemas/bookSchema";

export class updateABookDTO{
    readonly title:String;
    readonly description: String;
    readonly author: String;
    readonly price: number;
    readonly category :Category;
    readonly user:User
}