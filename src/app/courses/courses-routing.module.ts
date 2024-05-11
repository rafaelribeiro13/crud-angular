import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CourseResolver } from './guards/course.resolver';

const routes: Routes = [
  {
    path: ``,
    component: CoursesComponent
  },
  {
    path: `novo`,
    component: CourseFormComponent,
    resolve: { course: CourseResolver }
  },
  {
    path: `editar/:id`,
    component: CourseFormComponent,
    resolve: { course: CourseResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
