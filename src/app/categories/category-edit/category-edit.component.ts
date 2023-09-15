import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { Icon } from 'src/app/models/icons';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/categories';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {

  pageTitle: string = 'Edit Category'

  categoryForm!: FormGroup;
  sub!: Subscription;
  category!: Category | undefined;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
    ){}

  ngOnInit(){
    this.categoryForm = this.fb.group({
      categoryName: '',
      iconId: null
    })

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.category = this.categoryService.getCategory(id);
        this.displayCategory(this.category);
      }
    )
  }

  displayCategory(category: Category | undefined){
    if(this.categoryForm){
      this.categoryForm.reset();
    }
    // Update the data on the form
    this.categoryForm.patchValue({
      categoryName: this.category?.name,
      iconId: this.category?.icon?.id
    })
  }

  onCancel(){
    this.router.navigate(['/categories']);
  }

  saveCategory(): void {
    console.log(this.categoryForm.value.categoryName);
    console.log(this.categoryForm.value.iconId);
    console.log(`Category id: ${this.category?.id}`);
    if (this.categoryForm.valid) {
      let c : any= {
        id: this.category?.id,
        name: this.categoryForm.value.categoryName,
        icon: this.categoryService.getIcon(Number(this.categoryForm.value.iconId)) as Icon
      }
      console.log(c);
      this.categoryService.updateCategory(c as Category);
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.categoryForm.reset();
    this.router.navigate(['/categories']);
  }

  icons: Icon[] = this.categoryService.getIcons();

}
