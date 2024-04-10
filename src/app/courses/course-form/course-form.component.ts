import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CourseService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]]
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
