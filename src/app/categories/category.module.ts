import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryAddComponent } from './category-add/category-add.component';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryEditComponent,
    CategoryAddComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'categories', component:CategoryListComponent},
      {path:'categories/add', component:CategoryAddComponent},
      {path:'categories/:id/edit', component:CategoryEditComponent},
    ])
  ]
})
export class CategoryModule { }
