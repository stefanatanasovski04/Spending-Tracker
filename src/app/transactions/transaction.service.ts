import { EventEmitter, Injectable } from '@angular/core';
import { Transaction } from '../models/transactions';
import { CategoryService } from '../categories/category.service';
import { Category } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 
  transactionUpdated = new EventEmitter<void>();

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
    this.transactionUpdated.emit();
  }

  updateTransaction(transaction: Transaction){
    let objIndex = this.transactions.findIndex((obj => obj.id == transaction.id));
    this.transactions[objIndex] = transaction;
    this.totalIncome();
    this.totalExpense();
    this.transactionUpdated.emit();
  }

  deleteTransaction(id: number){
    const objWithIndex = this.transactions.findIndex((t) => t.id === id);
    if(objWithIndex > -1){
      this.transactions.splice(objWithIndex,1);
    }
    this.transactionUpdated.emit();
  }


  totalIncome(): number{
    let total: number = 0;
    this.transactions.forEach((t) => {
      if(t.type == 0){
        total = Number(total) + Number(t.amount);
      }
    } );
    return total;
  }

  totalExpense(): number{
    let total: number = 0;
    this.transactions.forEach((t) => {
      if(t.type == 1){
        total = Number(total) + Number(t.amount);
      }
    } );
    return total;
  }

  calculateExpenseByCategory() {
    const expenseByCategory = new Map();
    this.transactions
      .filter(transaction => transaction.type === 1 && transaction.category)
      .forEach(transaction => {
        const categoryName = transaction?.category?.name;
        const amount = transaction.amount;
        expenseByCategory.set(categoryName, (expenseByCategory.get(categoryName) || 0) + amount);
      });
    
    return Array.from(expenseByCategory, ([category, totalExpense]) => ({ category, totalExpense }));
  }
  
  transactions: Transaction[] = [
    {
      id: 0,
      type: 0,
      date:  new Date('2023-08-08'),
      category: this.categoryService.getCategory(0) as Category,
      amount: 3000,
      note: ''
    },
    {
      id: 1,
      type: 1,
      date:  new Date('2023-08-08'),
      category: this.categoryService.getCategory(1) as Category,
      amount: 150,
      note: 'Phone Bill'
    },
    {
      id: 2,
      type: 1,
      date:  new Date('2023-08-08'),
      category: this.categoryService.getCategory(2) as Category,
      amount: 230,
      note: 'Wallmart'
    },
    {
      id: 3,
      type: 1,
      date:  new Date('2023-08-08'),
      category: this.categoryService.getCategory(3) as Category,
      amount: 175,
      note: 'Eating at restourant'
    }
  ];
}
