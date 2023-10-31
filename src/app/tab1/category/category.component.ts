import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category, listCategory } from 'src/app/model/category';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';
import { CategoryService } from 'src/app/service/category.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent  implements OnInit, OnDestroy {
  type: "revenue" | "expenditure" = "revenue";
  listCategory: Category[] = listCategory.filter((item) => item.type === this.type);
  destroy$: Subject<void> = new Subject<void>();
  constructor(
    private modalCtrl: ModalController,
    private service: CategoryService
  ) { 
    this.service.AddCategory$.pipe(takeUntil(this.destroy$)).subscribe((category) => {
      if(!category) return;
      this.listCategory.push(category);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {}

  changeSegment(data: any) {
    if(data?.detail?.value){
      this.type = data.detail.value;
      this.listCategory = listCategory.filter((item) => item.type === this.type);
    }
  }

  back(){
    this.modalCtrl.dismiss();
  }

  async addCate(){
    const modal = await this.modalCtrl.create({
      component: DetailCategoryComponent,
      componentProps: {
        type: this.type
      }
    });

    modal.onDidDismiss().then((data) => {});
    await modal.present();
  }
}
