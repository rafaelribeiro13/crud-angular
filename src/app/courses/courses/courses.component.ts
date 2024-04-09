import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ICourse } from '../models/course';
import { CourseService } from '../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  
  displayedColumns: string[] = ['name', 'category', 'actions'];
  dataSource = ELEMENT_DATA;

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

  onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

}
