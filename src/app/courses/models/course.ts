import { Category } from "../enums/category";
import { ILesson } from "./lesson";

export interface ICourse {
    _id: string;
    name: string;
    category: Category | string;
    lessons?: ILesson[];
}
