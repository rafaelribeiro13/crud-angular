import { Component, ViewChild } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ICourse } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ICoursePage } from '../../models/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  
  coursePage$: Observable<ICoursePage> | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o curso?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
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
    });
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }): void {
    this.coursePage$ = this.courseService
      .getCourses(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catchError(error => {
          this.onError('Não foi possível carregar os cursos.');
          return of({ courses: [], totalElements: 0, totalPages: 0 });
        })
      );
  }

  onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

}
