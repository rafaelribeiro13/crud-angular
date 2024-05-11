import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';

import { CoursesComponent } from './courses.component';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { coursesPageMock } from '../../services/courses.mock';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ICourse } from '../../models/course';
import { CategoryPipe } from 'src/app/shared/pipes/category.pipe';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let loader: HarnessLoader;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    courseServiceSpy = jasmine.createSpyObj('CourseService', {
      'getCourses': of(coursesPageMock),
      'getCourse': undefined,
      'save': undefined,
      'remove': of(coursesPageMock.courses[0])
    });

    routerSpy = jasmine.createSpyObj(['navigate']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    snackBarSpy = jasmine.createSpyObj<MatSnackBar>(['open']);

    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        ErrorDialogComponent,
        ConfirmationDialogComponent,
        CoursesListComponent,
        CategoryPipe
      ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule
      ],
      providers: [
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: MatDialog },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and call ngOnInit', () => {
    courseServiceSpy.getCourses.and.returnValue(of(coursesPageMock));
    // will trigger ngOnInit
    fixture.detectChanges();
    expect(component).toBeTruthy();
    component.coursePage$?.subscribe(result => {
      expect(result).toEqual(coursesPageMock);
    });
  });

  it('should display error dialog when courses are not loaded', async () => {
    courseServiceSpy.getCourses.and.returnValue(throwError(() => new Error('test')));
    spyOn(component, 'onError');
    fixture.detectChanges() // ngOnInit
    expect(component.onError).toHaveBeenCalledWith('Não foi possível carregar os cursos.');
  });

  it('should navigate to new screen when onAdd', () => {
    component.onAdd(); // trigger action
    const spy = routerSpy.navigate as jasmine.Spy;
    expect(spy).toHaveBeenCalledTimes(1);
    const novoArgs = spy.calls.first().args;
    expect(novoArgs[0]).toEqual(['novo']);
    expect(novoArgs[1]).toEqual({ relativeTo: activatedRouteSpy });
  });

  it('should navigate to form screen when onEdit', () => {
    const course: ICourse = { _id: '1', name: '', category: '' };
    component.onEdit(course);
    const spy = routerSpy.navigate as jasmine.Spy;
    expect(spy).toHaveBeenCalledTimes(1);
    const editarArgs = spy.calls.first().args;
    expect(editarArgs[0]).toEqual(['editar', course._id]);
    expect(editarArgs[1]).toEqual({ relativeTo: activatedRouteSpy });
  });

  it('should open ErrorDialogComponent onError', async () => {
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();
    component.onError('Error');
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    dialogs[0].close(); // close so karma can see all results
  });

  it('should open ConfirmationDialogComponent onRemove', async () => {
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();
    component.onRemove(coursesPageMock.courses[0]);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    dialogs[0].close(); // close so karma can see all results
  })

  it('should remove course and display success message', async () => {
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();
    spyOn(component, 'refresh');
    component.onRemove(coursesPageMock.courses[0]);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    const button = document.getElementById('yesBtn');
    await button?.click();
    expect(courseServiceSpy.remove).toHaveBeenCalledTimes(1);
    expect(component.refresh).toHaveBeenCalledTimes(1);
  });

  it('should not remove course if No button was clicked', async () => {
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();
    component.onRemove(coursesPageMock.courses[0]);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    const button = document.getElementById('noBtn');
    await button?.click();
    expect(courseServiceSpy.remove).toHaveBeenCalledTimes(0);
  });

  it('should display error if course could not be removed', async () => {
    courseServiceSpy.remove.and.returnValue(throwError(() => new Error('test')));
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    spyOn(component, 'onError');
    fixture.detectChanges();
    component.onRemove(coursesPageMock.courses[0]);
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
    const button = document.getElementById('yesBtn');
    await button?.click();
    expect(courseServiceSpy.remove).toHaveBeenCalledTimes(1);
    expect(component.onError).toHaveBeenCalledTimes(1);
  });

});
