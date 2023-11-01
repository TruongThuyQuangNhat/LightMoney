import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category, categoryName, colorArray } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss'],
})
export class DetailCategoryComponent  implements OnInit, OnChanges {
  @Input() type: "revenue" | "expenditure" = "revenue";
  @Input() data: Category | undefined;
  categoryName: string[] = [];
  colorArray: string[] = colorArray;
  name: string = '';
  indexIcon: number = 0;
  indexColor: number = 0;
  color: string = colorArray[0];
  icon: string = '';
  topIconScroll: number = 0;
  topIconColor: number = 0;

  @ViewChild('scrollIcon') scrollIcon!: ElementRef;
  @ViewChild('scrollColor') scrollColor!: ElementRef;
  private savedScrollIcon: { top: number, left: number, behavior: string };
  private savedScrollColor: { top: number, left: number, behavior: string };

  constructor(
    private modalCtrl: ModalController,
    private service: CategoryService
  ) { 
    this.savedScrollIcon = { top: 0, left: 0, behavior: 'smooth' };
    this.savedScrollColor = { top: 0, left: 0, behavior: 'smooth' };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data){
      this.name = this.data.name;
      this.icon = this.data.icon;
      this.color = this.data.color;
      this.indexIcon = this.categoryName.findIndex((item) => item === this.icon);
      this.indexColor = this.colorArray.findIndex((item) => item === this.color);
      this.savedScrollIcon.top = this.data.topIcon || 0;
      this.scrollIcon.nativeElement.scrollTo(this.savedScrollIcon);
    }
  }

  @HostListener('scroll', ['$event']) 
  onScrollIcon(event: any) {
    const tartget = event.target as HTMLElement;
    if(tartget.scrollTop !== 0){
      this.savedScrollIcon  = { top: tartget.scrollTop, left: tartget.scrollLeft, behavior: 'smooth' };
    }
  }

  @HostListener('scroll', ['$event']) 
  onScrollColor(event: any) {
    const tartget = event.target as HTMLElement;
    if(tartget.scrollTop !== 0){
      this.savedScrollColor  = { top: tartget.scrollTop, left: tartget.scrollLeft, behavior: 'smooth' };
    }
  }

  ngOnInit() {
    if(this.data){
      this.name = this.data.name;
      this.icon = this.data.icon;
      this.color = this.data.color;
      this.categoryName = categoryName.filter((item) => item.includes(this.data?.typeIcon || 'outline'));
      this.indexIcon = this.categoryName.findIndex((item) => item === this.icon);
      this.indexColor = this.colorArray.findIndex((item) => item === this.color);
      this.savedScrollIcon.top = this.data.topIcon || 0;

      setTimeout(() => {
        this.scrollIcon.nativeElement.scrollTo(this.savedScrollIcon);
      }, 100);
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
    setTimeout(() => {
      this.icon = this.categoryName[this.indexIcon];
      this.scrollIcon.nativeElement.scrollTo(this.savedScrollIcon);
    }, 100);
  }

  back(){
    this.modalCtrl.dismiss();
  }

  chooseIcon(icon: string, index: number){
    this.topIconScroll = this.savedScrollIcon.top;
    console.log(this.topIconScroll);
    this.indexIcon = index;
    this.icon = icon;
  }

  chooseColor(color: string, index: number){
    this.topIconColor = this.savedScrollColor.top;
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
