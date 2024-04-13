import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: ICourse[] = [];
  @Output() addCourse = new EventEmitter(false);
  @Output() editCourse = new EventEmitter(false);

  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  onAdd(): void {
    this.addCourse.emit(true);
  }

  onEdit(course: ICourse): void {
    this.editCourse.emit(course);
  }

}
