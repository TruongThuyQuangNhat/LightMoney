import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category, listCategory } from 'src/app/model/category';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent  implements OnInit {
  type: "revenue" | "expenditure" = "revenue";
  listCategory: Category[] = listCategory.filter((item) => item.type === this.type);
  constructor(
    private modalCtrl: ModalController
  ) { }

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
