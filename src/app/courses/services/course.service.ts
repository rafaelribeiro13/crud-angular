import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICourse } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  getCourses(): ICourse[] {
    return [
      {_id: '1', name: 'Angular', category: 'Front-End'}
    ];
  }

}
