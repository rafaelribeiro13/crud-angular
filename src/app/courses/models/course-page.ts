import { ICourse } from "./course";

export interface ICoursePage {
    courses: ICourse[];
    totalElements: number;
    totalPages: number;
}
