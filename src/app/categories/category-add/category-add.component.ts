import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/categories';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Icon } from 'src/app/models/icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {
  pageTitle: string = 'Add Category'

  categoryForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: '',
      iconId: null
    })
  }

  onCancel() {
    this.router.navigate(['/categories']);
  }

  saveCategory(): void {
    console.log(this.categoryForm.value.categoryName);
    console.log(this.categoryForm.value.iconId);
    let iconId: number = Number(this.categoryForm.value.iconId);
    if (this.categoryForm.valid) {
      let c = {
        name: this.categoryForm.value.categoryName,
        icon: this.categoryService.getIcon(iconId) as Icon
      }
      console.log(c);
      this.categoryService.createCategory(c);
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.categoryForm.reset();
    this.router.navigate(['/categories']);
  }

  icons: Icon[] = this.categoryService.getIcons();
}
