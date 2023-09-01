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

  getTransaction(id: number): Transaction | undefined{
    return this.transactions.find(e => e.id === id);
  }

  createTransaction(transaction: any){
    transaction.id = Math.max(...this.getTransactions().map(o => o.id)) + 1;
    this.transactions.push(transaction as Transaction);
    this.totalIncome();
    this.totalExpense();
  }

  updateTransaction(transaction: Transaction){
    let objIndex = this.transactions.findIndex((obj => obj.id == transaction.id));
    this.transactions[objIndex] = transaction;
    this.totalIncome();
    this.totalExpense();
  }

  totalIncome(): number{
    let total: number = 0;
    this.transactions.forEach((t) => {
      if(t.type == 0){
        total = Number(total) + Number(t.amount);
      }
    } );
    console.log('Income: ' + total);
    return total;
  }

  totalExpense(): number{
    let total: number = 0;
    this.transactions.forEach((t) => {
      if(t.type == 1){
        total = Number(total) + Number(t.amount);
      }
    } );
    console.log('Expense: ' + total);
    return total;
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
  ];
}
