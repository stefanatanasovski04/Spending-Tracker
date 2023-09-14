import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/models/categories';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {

  pageTitle: string = 'Add Transaction';
  categories!: Category[];
  transactionForm!: FormGroup;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      transactionType: null,
      transactionDate: "",
      categoryId: null,
      transactionAmount:"",
      transactionNote:""
    })

    this.categories = this.categoryService.getCategories();
  }

  onCancel(){
    this.router.navigate(['/transactions']);
  }

  saveTransaction(){
    let cateogryId: number = Number(this.transactionForm.value.categoryId);
    if(this.transactionForm.valid){
      let t = {
        type: Number(this.transactionForm.value.transactionType),
        date: this.transactionForm.value.transactionDate,
        category: this.categoryService.getCategory(cateogryId) as Category,
        amount: Number(this.transactionForm.value.transactionAmount),
        note: this.transactionForm.value.transactionNote
      }
      console.log(t);
      this.transactionService.createTransaction(t);
      this.onSaveComplete();
    }
  }


  onSaveComplete(): void {
    this.transactionForm.reset();
    this.router.navigate(['/transactions'])
  }




}
