import { Injectable } from '@angular/core';
import { Category } from '../models/categories';
import { Icon } from '../models/icons';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(){
    return this.categories;
  }

  getIcons(){
    return this.icons;
  }

  getCategory(id: number): Category | undefined{
    return this.categories.find(e => e.id === id);
  }

  getIcon(id: number): Icon | undefined{
    return this.icons.find(e => e.id === id);
  }

  createCategory(category: any){
    category.id = Math.max(...this.getCategories().map(o => o.id)) + 1;
    this.categories.push(category as Category);
  }

  updateCategory(category: Category){
    let objIndex = this.categories.findIndex((obj => obj.id == category.id));
    this.categories[objIndex] = category;
  }
  

  
  icons: Icon[] = [
    {
      id: 0,
      iconUrl: '/assets/images/icons8-bill-96.png'
    },
    {
      id: 1,
      iconUrl: '/assets/images/icons8-bread-96.png'
    },
    {
      id: 2,
      iconUrl: '/assets/images/icons8-candy-96.png'
    },
    {
      id: 3,
      iconUrl: '/assets/images/icons8-cutlery-96.png'
    },
    {
      id: 4,
      iconUrl: '/assets/images/icons8-garage-96.png'
    },
    {
      id: 5,
      iconUrl: '/assets/images/icons8-grapes-96.png'
    },
    {
      id: 6,
      iconUrl: '/assets/images/icons8-office-chair-96.png'
    },
    {
      id: 7,
      iconUrl: '/assets/images/icons8-office-phone-96.png'
    },
    {
      id: 8,
      iconUrl: '/assets/images/icons8-soccer-ball-96.png'
    },
    {
      id: 9,
      iconUrl: '/assets/images/icons8-swimming-96.png'
    },
    {
      id: 10,
      iconUrl: '/assets/images/icons8-hamburger-96.png'
    },
  ]

  categories: Category[] = [
    {
      id: 0,
      name: 'Salary',
      icon: this.getIcon(6)
    },
    {
      id: 1,
      name: 'Bills',
      icon: this.getIcon(0)
    },
    {
      id: 2,
      name: 'Groceries',
      icon: this.getIcon(1)
    },
    {
      id: 3,
      name: 'Food',
      icon: this.getIcon(10)
    }
  ];


}
