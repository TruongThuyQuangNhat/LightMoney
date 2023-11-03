import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category, categoryName, colorArray } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { v4 as uuidv4 } from 'uuid';

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
  typeIcon: string = 'outline';

  constructor(
    private modalCtrl: ModalController,
    private service: CategoryService
  ) { }

  ngAfterViewInit(): void {
    this.scrollIcon();
    this.scrollColor();
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
      if(data !== this.typeIcon){
        this.typeIcon = data;
        this.categoryName = categoryName.filter((item) => item.includes(data));
        if(this.icon.includes('outline')){
          this.icon = this.icon.replace('outline', data);
        } else if(this.icon.includes('sharp')){
          this.icon = this.icon.replace('sharp', data);
        } else {
          this.icon = this.icon + '-' + data;
        }
        this.scrollIcon();
      }
    }else{
      if(data !== this.typeIcon){
        this.typeIcon = '';
        if(this.icon.includes('outline')){
          this.icon = this.icon.replace('outline', '');
        } else {
          this.icon = this.icon.replace('sharp', '');
        }
        this.icon = this.icon.slice(0, this.icon.length - 1);
        this.categoryName = categoryName.filter((item) => !(item.includes('outline') || item.includes('sharp')));
        this.scrollIcon();
      }
    }
  }

  scrollIcon(){
    setTimeout(() => {
      document.getElementById(this.icon)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 100);
  }

  scrollColor(){
    setTimeout(() => {
      document.getElementById(this.color)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 1000);
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
      id: uuidv4(),
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
