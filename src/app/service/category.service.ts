import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private AddCategory: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public AddCategory$ = this.AddCategory.asObservable();
  constructor() { }

  addCategory(category: Category) {
    this.AddCategory.next(category);
  }
}
