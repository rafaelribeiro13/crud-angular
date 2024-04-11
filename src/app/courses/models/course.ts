import { Category } from "../enums/category";

export interface ICourse {
    _id: string;
    name: string;
    category: Category | string;
}
