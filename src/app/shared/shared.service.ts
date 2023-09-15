import { Injectable } from '@angular/core';
import { TransactionService } from '../transactions/transaction.service';
import { CategoryService } from '../categories/category.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) { }

  deleteCategory(id: number) {
    console.log(`In shared service ${id}`);
    let isReferenced = false;
    this.transactionService.getTransactions().forEach(transaction => {
      if (transaction.category?.id === id) {
        isReferenced = true;
      }
    });
    if (isReferenced) {
      let confirmAwnser = confirm("There are existing transactions with this category. Deleting this category will remove them all!! Are you sure? ")
      if (confirmAwnser) {
        this.cascadeTransactions(id);
        this.categoryService.deleteCategory(id);
      }
    } else {
      this.categoryService.deleteCategory(id);
    }
  }

  cascadeTransactions(id: number) {
    this.transactionService.getTransactions().forEach(t => {
      if (t.category?.id == id) {
        this.transactionService.deleteTransaction(t.id)
      }
    })
  }


}
