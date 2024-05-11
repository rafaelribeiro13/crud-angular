import { TestBed } from '@angular/core/testing';

import { CourseResolver } from './course.resolver';
import { CourseService } from '../services/course.service';
import { ICourse } from '../models/course';
import { Category } from '../enums/category';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const mockRoute = {
  params: { id: 1 }
} as unknown as ActivatedRouteSnapshot;

const mockEmptyRoute = {
  params: {}
} as unknown as ActivatedRouteSnapshot;

const state = {} as unknown as RouterStateSnapshot;

describe('CourseResolver', () => {

  let resolver: CourseResolver;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;

  beforeEach(() => {
    courseServiceSpy = jasmine.createSpyObj('CourseService', ['getCourse']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: CourseService, useValue: courseServiceSpy
        },
      ],
    });

    resolver = TestBed.inject(CourseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should return course', () => {
    const course: ICourse = {
      _id: '1',
      name: 'Angular',
      category: Category.FRONT_END,
      lessons: []
    };

    courseServiceSpy.getCourse.and.returnValue(of(course));
    const result = resolver.resolve(mockRoute, state);
    result.subscribe((res: ICourse) => expect(res).toEqual(course));
  });

  it('should return empty course if new', () => {
    const course: ICourse = { _id: '', name: '', category: '', lessons: [] };
    courseServiceSpy.getCourse.and.returnValue(of(course));
    const result = resolver.resolve(mockEmptyRoute, state);
    result.subscribe((res: ICourse) => expect(res).toEqual(course));
  });

});
