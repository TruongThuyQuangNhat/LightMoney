import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent  implements OnInit {
  listCategory: any[] = [];
  listCategoryRoot: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private cateService: CategoryService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.cateService.getCategory()?.then((data: any) => {
      if(data){
        this.listCategory = [...data];
        this.listCategoryRoot = [...data];
      }
    });
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  searchCategory(data: any){
    this.listCategory = this.listCategoryRoot.filter((item: any) => {
      return item.name.toLowerCase().includes(data.detail.value.toLowerCase());
    });
  }
}
