import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { categoryName, colorArray } from 'src/app/model/category';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss'],
})
export class DetailCategoryComponent  implements OnInit {
  categoryName: string[] = [];
  colorArray: string[] = colorArray;
  name: string = '';
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.categoryName = categoryName.filter((item) => item.includes('outline'));
  }

  filterCate(data?: string){
    if(data){
      this.categoryName = categoryName.filter((item) => item.includes(data));
    }else{
      this.categoryName = categoryName.filter((item) => !(item.includes('outline') || item.includes('sharp')));
    }
  }

  back(){
    this.modalCtrl.dismiss();
  }
}
