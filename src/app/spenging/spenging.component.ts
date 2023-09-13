import { ChangeDetectorRef, Component } from '@angular/core';
import { Category } from '../models/categories';
import { CategoryService } from '../categories/category.service';
import { TransactionService } from '../transactions/transaction.service';
import { BehaviorSubject, Subscription, from, of } from 'rxjs';
import { Transaction } from '../models/transactions';

@Component({
  selector: 'app-spenging',
  templateUrl: './spenging.component.html',
  styleUrls: ['./spenging.component.css']
})
export class SpengingComponent {

  income!: number;
  expense!: number;
  total!: number;
  spendingByCategory!: { category: string, totalExpense: number }[];
  


  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.updateValues();
    const array = this.calculateExpenseByCategory(this.transactionService.transactions);
    const obsof1 = from(array);
    obsof1.subscribe(val => {
      console.log(val);
    })
    // this.transactionService.transactionUpdated.subscribe(() => {
    //   // console.log(transactions)
    //     this.updateValues;
    //     // this.spendingByCategory = this.calculateExpenseByCategory(transactions);
    //     // console.log(this.spendingByCategory)
    // });
  }

  private updateValues(){
    this.income = this.transactionService.totalIncome();
    this.expense = this.transactionService.totalExpense();
    this.total = this.transactionService.totalIncome() - this.transactionService.totalExpense();
    // this.spendingByCategory = this.calculateExpenseByCategory(this.transactionService.transactions);
  }

  calculateExpenseByCategory(transactions:Transaction[]) {
    const expenseByCategory = new Map();
    
    transactions
      .filter(transaction => transaction.type === 1 && transaction.category)
      .forEach(transaction => {
        const categoryName = transaction?.category?.name;
        const amount = transaction.amount;
    
        expenseByCategory.set(categoryName, (expenseByCategory.get(categoryName) || 0) + amount);
      });
  
    return Array.from(expenseByCategory, ([category, totalExpense]) => ({ category, totalExpense }));
  }
}
