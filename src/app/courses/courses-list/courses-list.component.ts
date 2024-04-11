import { Component, Input } from '@angular/core';
import { ICourse } from '../models/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: ICourse[] = [];
  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onAdd(): void {
    this.router.navigate(['novo'], {relativeTo: this.route});
  }

}
