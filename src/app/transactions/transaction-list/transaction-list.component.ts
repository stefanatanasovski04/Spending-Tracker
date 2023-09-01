import { Component } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { CategoryService } from 'src/app/categories/category.service';
import { Transaction } from 'src/app/models/transactions';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {

  transactions!: Transaction[];
  income!: number;
  expense!: number;
  
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
    ){}

    ngOnInit(){
      this.transactions = this.transactionService.getTransactions();
      this.income = this.transactionService.totalIncome();
      this.expense = this.transactionService.totalExpense();
    }
}
