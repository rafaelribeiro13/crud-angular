import { Pipe, PipeTransform } from '@angular/core';
import { Category } from 'src/app/courses/enums/category';
import { CategoryIcon } from 'src/app/courses/enums/category-icon';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: Category): string {
    switch (value) {
      case Category.FRONT_END: return CategoryIcon.FRONT_END;
      case Category.BACK_END: return CategoryIcon.BACK_END;
      default: return 'code'
    }
  }

}
