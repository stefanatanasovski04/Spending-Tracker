import { Component } from '@angular/core';
import { Category } from '../models/categories';
import { CategoryService } from '../categories/category.service';
import { TransactionService } from '../transactions/transaction.service';

@Component({
  selector: 'app-spenging',
  templateUrl: './spenging.component.html',
  styleUrls: ['./spenging.component.css']
})
export class SpengingComponent {

  income!: number;
  expense!: number;

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ){}

  ngOnInit(){
    this.income = this.transactionService.totalIncome();
    this.expense = this.transactionService.totalExpense();
  }


}
