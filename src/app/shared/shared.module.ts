import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './custom-paginator-intl.service';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    CategoryPipe
  ],
  providers: [
    {
      provide: MatPaginatorIntl, useClass: CustomPaginatorIntl
    }
  ]
})
export class SharedModule { }
