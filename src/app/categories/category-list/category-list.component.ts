import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from 'src/app/models/categories';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  constructor(private categoryService: CategoryService){}

  categories: Category[] = this.categoryService.getCategories();

}
