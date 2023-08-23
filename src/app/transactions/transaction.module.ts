import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TransactionEditComponent,
    TransactionListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'transactions', component:TransactionListComponent},
      {path:'transactions/:id/edit', component:TransactionEditComponent},
    ])
  ]
})
export class TransactionModule { }