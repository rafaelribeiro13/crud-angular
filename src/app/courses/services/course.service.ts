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

  getCourse(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.COURSE_API}/${id}`)
      .pipe(
        first()
      );
  }

  save(record: Partial<ICourse>): Observable<ICourse> {
    return record._id ? this.update(record) : this.create(record);
  }

  private create(record: Partial<ICourse>): Observable<ICourse>  {
    return this.http
      .post<ICourse>(this.COURSE_API, record)
      .pipe(
        first()
      );
  }

  private update(record: Partial<ICourse>): Observable<ICourse> {
    return this.http
      .put<ICourse>(`${this.COURSE_API}/${record._id}`, record)
      .pipe(
        first()
      );
  }

  remove(id: string): Observable<unknown> {
    return this.http.delete(`${this.COURSE_API}/${id}`).pipe(first());
  }

}
