import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { Category } from 'src/app/model/category';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';
import { CategoryService } from 'src/app/service/category.service';
import { Subject, takeUntil } from 'rxjs';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent  implements OnInit {
  type: "revenue" | "expenditure" = "revenue";
  listCategory: Category[] =[];
  listCategoryRoot: Category[] = [];
  constructor(
    private modalCtrl: ModalController,
    private service: CategoryService,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    setTimeout(async () => {
      await this.storage.get('ArrayCategory')?.then((data) => {
        this.listCategoryRoot = data;
        this.listCategory = this.listCategoryRoot
          .filter((item: Category) => item.type === this.type)
          .sort((a: Category, b: Category) => a.index - b.index);
      });
    }, 10);
  }

  changeSegment(data: any) {
    if(data?.detail?.value){
      this.type = data.detail.value;
      this.listCategory = this.listCategoryRoot
          .filter((item: Category) => item.type === this.type)
          .sort((a: Category, b: Category) => a.index - b.index);
    }
  }

  back(){
    this.modalCtrl.dismiss();
  }

  async addCate(){
    const modal = await this.modalCtrl.create({
      component: DetailCategoryComponent,
      componentProps: {
        type: this.type,
        action: 'add'
      }
    });

    modal.onDidDismiss().then((data) => {
      if(data.role === 'save'){
        this.listCategory.push(data.data);
        this.listCategoryRoot.push(data.data);
      }
    });
    await modal.present();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.listCategory[ev.detail.from].index = ev.detail.to;
    this.listCategory[ev.detail.to].index = ev.detail.from;
    this.listCategory.sort((a: Category, b: Category) => a.index - b.index);

    const indexFrom = this.listCategoryRoot.findIndex((item) => item.id === this.listCategory[ev.detail.from].id);
    const indexTo = this.listCategoryRoot.findIndex((item) => item.id === this.listCategory[ev.detail.to].id);
    if(indexFrom !== -1 && indexTo !== -1){
      this.listCategoryRoot[indexFrom].index = ev.detail.from;
      this.listCategoryRoot[indexTo].index = ev.detail.to;
      setTimeout(() => {
        this.storage.set('ArrayCategory', this.listCategoryRoot);
      }, 10);
    }
    ev.detail.complete();
  }

  async openDetail(data: Category){
    const modal = await this.modalCtrl.create({
      component: DetailCategoryComponent,
      componentProps: {
        type: this.type,
        data,
        action: 'edit'
      }
    });
    modal.onDidDismiss().then(async (data) => {
      if(data.role === 'delete'){
        this.listCategory = this.listCategory.filter((item) => item.id !== data.data.id);
      } else if(data.role === 'save'){
        const index = this.listCategory.findIndex((item) => item.id === data.data.id);
        this.listCategory[index] = data.data;
      }
    });
    await modal.present();
  }
}
