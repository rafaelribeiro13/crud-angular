import { ResolveFn } from '@angular/router';
import { ICourse } from './../models/course';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<ICourse> = (
    route, state, service: CourseService = inject(CourseService)
) => {
  if (route.params && route.params['id']) {
    return service.getCourse(route.params['id']);
  }

  return of({_id: '', name: '', category: ''});
};
