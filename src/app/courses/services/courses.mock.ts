import { Category } from "../enums/category";
import { ICourse } from "../models/course";
import { ICoursePage } from "../models/course-page";

export const coursesMock: ICourse[] = [
    {
        _id: '1',
        name: 'Angular',
        category: Category.FRONT_END,
        lessons: [
            {
                id: '1',
                name: 'Componentes',
                youtubeUrl: 'https://youtu.be/jfKfPfyJRdk'
            }
        ]
    },
    {
        _id: '2',
        name: 'Java',
        category: Category.BACK_END,
        lessons: [
            {
                id: '2',
                name: 'Herança',
                youtubeUrl: 'https://youtu.be/jfKfPfyJRdk'
            }
        ]
    }
];

export const coursesPageMock: ICoursePage = {
    courses: coursesMock,
    totalElements: 2,
    totalPages: 1
};