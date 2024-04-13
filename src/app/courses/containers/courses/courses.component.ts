import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ICourse } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  
  courses$: Observable<ICourse[]>;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.courses$ = this.courseService
      .getCourses()
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catchError(error => {
          this.onError('Não foi possível carregar os cursos.');
          return of([]);
        })
      );
  }

  onAdd(): void {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

  onEdit(course: ICourse): void {
    this.router.navigate(['editar', course._id], {relativeTo: this.route});
  }

  onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

}
