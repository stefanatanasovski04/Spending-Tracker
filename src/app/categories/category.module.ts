import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { RouterModule } from '@angular/router'



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'categories', component:CategoryListComponent},
      {path:'categories/:id/edit', component:CategoryEditComponent},
    ])
  ]
})
export class CategoryModule { }
