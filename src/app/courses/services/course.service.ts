import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, take, tap } from 'rxjs';
import { ICourse } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly COURSE_API = 'assets/courses.json';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.COURSE_API)
      .pipe(
        tap(data => console.log(data)),
        take(1)
      );
  }

}
