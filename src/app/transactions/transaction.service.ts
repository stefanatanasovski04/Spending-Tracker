import { Injectable } from '@angular/core';
import { Transaction } from '../models/transactions';
import { CategoryService } from '../categories/category.service';
import { Category } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 

  constructor(private categoryService: CategoryService) { }

  getTransactions(): Transaction[] {
    return this.transactions;
  }


  transactions: Transaction[] = [
    {
      id: 0,
      type: 0,
      date:  new Date('2023-08-08'),
      category: this.categoryService.getCategory(2) as Category,
      amount: 100,
      note: 'Football pay'
    },
    {
      id: 1,
      type: 1,
      date:  new Date('2023-08-08'),
      category: this.categoryService.getCategory(0) as Category,
      amount: 100,
      note: 'Eating at restourant'
    },
    {
      id: 2,
      type: 0,
      date:  new Date('2023-08-08'),
      category: this.categoryService.getCategory(0) as Category,
      amount: 230,
      note: ''
    },
  ]
}
