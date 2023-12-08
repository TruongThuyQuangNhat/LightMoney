import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent  implements OnInit {
  listCategory: any[] = [];
  listCategoryRoot: any[] = [];
  filter: string = "";
  searchString: string = "";
  @Input() listFilterCategory: Category[] = [];
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
        const newdata = data.map((item: any) => {
          const index = this.listFilterCategory.findIndex((cate) => {
            return cate.id === item.id;
          });
          if(index !== -1){
            item.checked = true;
          } else {
            item.checked = false;
          }
          return item;
        });
        this.listCategory = [...newdata];
        this.listCategoryRoot = [...newdata];
      }
    });
  }

  filterData(data: any){
    if(this.filter == data){
      this.filter = "";
    } else {
      this.filter = data;
    }
    this.searchCategory({detail: {value: this.searchString}});
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  searchCategory(data: any){
    this.searchString = data?.detail?.value || "";
    if(this.searchString === ""){
      this.listCategory = this.listCategoryRoot;
    } else {
      this.listCategory = this.listCategoryRoot.filter((item: any) => {
        return item.name.toLowerCase().includes(this.searchString.toLowerCase());
      });
    }
    if(this.filter !== ""){
      this.listCategory = this.listCategory.filter((item: any) => {
        return item.type === this.filter;
      });
    }
  }

  chooseCate(data: any){
    const index = this.listCategory.findIndex((item) => {
      return item.id === data.id;
    });
    if(index !== -1){
      this.listCategory[index].checked = !this.listCategory[index].checked;
    }
  }

  accept(){
    const array = this.listCategory.filter((item) => {
      if(item.checked){
        return item;
      }
    });
    this.modalCtrl.dismiss(array, "accept");
  }
}
