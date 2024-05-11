import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Observable, of } from 'rxjs';
import { ICourse } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver {

  constructor(private service: CourseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICourse> {
    if (route?.params['id']) {
      return this.service.getCourse(route.params['id']);
    }

    return of({ _id: '', name: '', category: '', lessons: []  } as ICourse)
  }

}
