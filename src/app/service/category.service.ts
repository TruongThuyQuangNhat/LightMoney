import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../model/category';
import { StorageService } from './storage.service';
import { ToastController } from '@ionic/angular';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private storage: StorageService,
    private toast: ToastService,
  ) { }

  saveCategory(category: Category) {
    this.storage.get('ArrayCategory')?.then((data) => {
      if (data && data.length > 0) {
        data.push(category);
        this.storage.set('ArrayCategory', data);
      } else {
        this.storage.set('ArrayCategory', [category]);
      }
    });
  }

  getCategory() {
    return this.storage.get('ArrayCategory');
  }

  async checkEventAvailable(category: Category) {
    return await this.storage.get('ArrayEvent')?.then(async (data) => {
      if (data && data.length > 0) {
        data = data.find((item: any) => item.category.id === category.id);
        if(data){
          this.toast.toastMessage('Không thể xóa danh mục này');
          return true;
        } else {
          return false
        }
      } else {
        return false
      }
    });
  }

  async deleteCategory(category: Category) {
    await this.storage.get('ArrayCategory')?.then((data) => {
      if (data && data.length > 0) {
        data = data.filter((item: Category) => item.id !== category.id);
        this.storage.set('ArrayCategory', data);
      }
    });
  }

  async updateCategory(category: Category) {
    await this.storage.get('ArrayCategory')?.then((data) => {
      if (data && data.length > 0) {
        data = data.map((item: Category) => {
          if (item.id === category.id) {
            item = category;
          }
          return item;
        });
        this.storage.set('ArrayCategory', data);
      }
    });
  }
}
