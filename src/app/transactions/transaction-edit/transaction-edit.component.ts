import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/categories';
import { TransactionService } from '../transaction.service';
import { CategoryService } from 'src/app/categories/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/models/transactions';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent {


  pageTitle: string = 'Edit Transaction';

  transaction!: Transaction | undefined;
  transactionForm!: FormGroup;
  sub!: Subscription;
  categories!: Category[];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }




  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      transactionType: null,
      transactionDate: "",
      categoryId: null,
      transactionAmount: "",
      transactionNote: ""
    })

    this.categories = this.categoryService.getCategories();

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.transaction = this.transactionService.getTransaction(id);
        this.displayTransaction(this.transaction);
      }
    )
  }

  displayTransaction(transaction: Transaction | undefined) {
    if (this.transactionForm) {
      this.transactionForm.reset();
    }

    // Update data on the form
    this.transactionForm.patchValue({
      transactionType: this.transaction?.type,
      transactionDate: this.transaction?.date,
      categoryId: this.transaction?.category?.id,
      transactionAmount: this.transaction?.amount,
      transactionNote: this.transaction?.note
    })
  }

  onCancel() {
    this.router.navigate(['/transactions']);
  }

  saveTransaction(): void {
    let cateogryId: number = Number(this.transactionForm.value.categoryId);
    if (this.transactionForm.valid) {
      let t = {
        id:this.transaction?.id,
        type: this.transactionForm.value.transactionType,
        date: this.transactionForm.value.transactionDate,
        category: this.categoryService.getCategory(cateogryId) as Category,
        amount: this.transactionForm.value.transactionAmount,
        note: this.transactionForm.value.transactionNote
      }
      console.log(t);
      this.transactionService.updateTransaction(t as Transaction);
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.transactionForm.reset();
    this.router.navigate(['/transactions']);
  }
}
