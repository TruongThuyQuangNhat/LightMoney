import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category, categoryName, colorArray } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss'],
})
export class DetailCategoryComponent  implements OnInit, AfterViewInit {
  @Input() type: "revenue" | "expenditure" = "revenue";
  @Input() data: Category | undefined;
  categoryName: string[] = [];
  colorArray: string[] = colorArray;
  name: string = '';
  indexIcon: number = 0;
  indexColor: number = 0;
  color: string = colorArray[0];
  icon: string = '';

  constructor(
    private modalCtrl: ModalController,
    private service: CategoryService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById(this.icon)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 100);

    setTimeout(() => {
      document.getElementById(this.color)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 1000);
  }

  ngOnInit() {
    if(this.data){
      this.name = this.data.name;
      this.icon = this.data.icon;
      this.color = this.data.color;
      this.categoryName = categoryName.filter((item) => item.includes(this.data?.typeIcon || 'outline'));
      this.indexIcon = this.categoryName.findIndex((item) => item === this.icon);
      this.indexColor = this.colorArray.findIndex((item) => item === this.color);
    } else {
      this.categoryName = categoryName.filter((item) => item.includes('outline'));
      this.icon = this.categoryName[this.indexIcon];
    }
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

  chooseIcon(icon: string, index: number){
    this.indexIcon = index;
    this.icon = icon;
  }

  chooseColor(color: string, index: number){
    this.indexColor = index;
    this.color = color;
  }

  save(){
    const data: Category = {
      name: this.name,
      icon: this.icon,
      color: this.color,
      type: this.type,
      isDefault: false
    };
    this.service.addCategory(data);
    this.modalCtrl.dismiss();
  }
}
