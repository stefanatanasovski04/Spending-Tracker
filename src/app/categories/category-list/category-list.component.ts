import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from 'src/app/models/categories';
import { TransactionService } from 'src/app/transactions/transaction.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  constructor(
    private categoryService: CategoryService,
    private sharedService: SharedService
  ){}


  categories!: Category[];

  
  ngOnInit(){
    this.updateValues();
    this.categoryService.categoryUpdated.subscribe(() =>{
      this.updateValues();
    })
  }

  updateValues(){
    this.categories = this.categoryService.getCategories();
  }

  deleteCategory(id: number) {
    this.sharedService.deleteCategory(id);
  }

}
