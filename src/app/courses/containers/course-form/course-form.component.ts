import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.fb.group({
    _id: [''],
    name: ['', [Validators.required]],
    category: ['', [Validators.required]]
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private service: CourseService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course: ICourse = this.route.snapshot.data['course'];
    
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit(): void {
    this.service.save(this.form.value).subscribe({
      next: () => {
        this.onSuccess();
      },
      error: () => {
        this.onError();
      }
    });
  }

  onCancel(): void {
    this.location.back();
  }

  private onSuccess(): void {
    this._snackBar.open(
      'Curso salvo com sucesso!', 
      'Fechar',
      { duration: 5000 }
    );
    this.location.back();
  }

  private onError(): void {
    this._snackBar.open(
      'Erro ao salvar o curso', 
      'Fechar',
      { duration: 5000 }
    );
  }
}
