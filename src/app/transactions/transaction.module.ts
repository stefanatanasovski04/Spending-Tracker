import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RouterModule } from '@angular/router';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TransactionEditComponent,
    TransactionListComponent,
    TransactionAddComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'transactions', component:TransactionListComponent},
      {path:'transactions/add', component:TransactionAddComponent},
      {path:'transactions/:id/edit', component:TransactionEditComponent},
    ])
  ]
})
export class TransactionModule { }
