import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, delay, take, tap } from 'rxjs';
import { ICourse } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly COURSE_API = 'api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.COURSE_API)
      .pipe(
        delay(3000),
        take(1),
        tap(data => console.log(data)),
      );
  }

}
