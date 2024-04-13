import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ICourse } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  
  courses$: Observable<ICourse[]> | null = null;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.refresh()
  }

  onAdd(): void {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

  onEdit(course: ICourse): void {
    this.router.navigate(['editar', course._id], {relativeTo: this.route});
  }

  onDelete(course: ICourse): void {
    this.courseService.remove(course._id).subscribe({
      next: () => {
        this.refresh();
        this._snackBar.open(
          'Curso removido com sucesso!', 
          'Fechar',
          { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
        );
      },
      error: () => {
        this.onError('Erro ao tentar remover curso!');
      }
    });
  }

  refresh(): void {
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

  onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

}
