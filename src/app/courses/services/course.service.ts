import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, first, take, tap } from 'rxjs';
import { ICourse } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly COURSE_API_MOCK = 'assets/courses.json';
  private readonly COURSE_API = 'api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.COURSE_API)
      .pipe(
        take(1),
        tap(data => console.log(data)),
      );
  }

  save(record: Partial<ICourse>): Observable<ICourse> {
    return this.http
      .post<ICourse>(this.COURSE_API, record)
      .pipe(
        first()
      );
  }

}
