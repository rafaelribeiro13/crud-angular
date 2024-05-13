import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { coursesMock } from '../../services/courses.mock';
import { CoursesListComponent } from './courses-list.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
      ],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.courses = coursesMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify if displayedColumns have value', () => {
    expect(component.displayedColumns).toBeTruthy();
    expect(component.displayedColumns.length).toBe(3);
  });

  it('should if verify if courses have value', () => {
    expect(component.courses).toBeTruthy();
    expect(component.courses.length).toBe(coursesMock.length);
  });

  it('should emit event when click on edit', () => {
    spyOn(component.editCourse, 'emit');
    const course = coursesMock[0];
    component.onEdit(course);
    expect(component.editCourse.emit).toHaveBeenCalledWith(course);
  });

  it('should emit event when clcick on remove', () => {
    spyOn(component.removeCourse, 'emit');
    const course = coursesMock[0];
    component.onRemove(course);
    expect(component.removeCourse.emit).toHaveBeenCalledWith(course);
  });

  it('should emit event when clcick on add', () => {
    spyOn(component.addCourse, 'emit');
    component.onAdd();
    expect(component.addCourse.emit).toHaveBeenCalledWith(true);
  });

});
