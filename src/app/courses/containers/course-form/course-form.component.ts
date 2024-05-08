import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../models/course';
import { ILesson } from '../../models/lesson';
import { CourseService } from '../../services/course.service';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private service: CourseService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formService: FormUtilsService
  ) {}

  ngOnInit(): void {
    const course: ICourse = this.route.snapshot.data['course'];
    
    this.form = this.fb.group({
      _id: [course._id],
      name: [course.name, [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100)]
      ],
      category: [course.category, [Validators.required]],
      lessons: this.fb.array(this.retrieveLessons(course), [Validators.required])
    });
  }

  private retrieveLessons(course: ICourse): FormGroup[] {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => {
        lessons.push(this.createLesson(lesson));
      });
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(
    lesson: ILesson = {id: '', name: '', youtubeUrl: ''}
  ): FormGroup {
    return this.fb.group({
      id: [lesson.id],
      name: [lesson.name, [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100)
      ]],
      youtubeUrl: [lesson.youtubeUrl, [
        Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(100)
      ]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: () => {
          this.onSuccess();
        },
        error: () => {
          this.onError();
        }
      });
    } else {
      this.formService.validateAllFormFields(this.form);
    }
  }

  onCancel(): void {
    this.location.back();
  }

  addNewLesson(): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  getLessonsFormArray(): AbstractControl<any, any>[] {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
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
