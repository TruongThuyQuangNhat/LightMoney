import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { categoryName, colorArray } from 'src/app/model/category';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss'],
})
export class DetailCategoryComponent  implements OnInit, AfterViewInit {
  categoryName: string[] = [];
  colorArray: string[] = colorArray;
  name: string = '';
  indexIcon: number = 0;
  indexColor: number = 0;
  color: string = colorArray[0];
  icon: string = '';

  @ViewChild('scrollIcon') scrollIcon!: ElementRef;
  private savedScrollPosition: { top: number, left: number, behavior: string };

  constructor(
    private modalCtrl: ModalController,
  ) { 
    this.savedScrollPosition = { top: 0, left: 0, behavior: 'smooth' };
  }

  ngAfterViewInit(): void {
    this.scrollIcon.nativeElement.scrollTo(this.savedScrollPosition);
  }



  @HostListener('scroll', ['$event']) 
  onScroll(event: any) {
    const tartget = event.target as HTMLElement;
    if(tartget.scrollTop !== 0){
      this.savedScrollPosition  = { top: tartget.scrollTop, left: tartget.scrollLeft, behavior: 'smooth' };
    }
  }

  ngOnInit() {
    this.categoryName = categoryName.filter((item) => item.includes('outline'));
    this.icon = this.categoryName[this.indexIcon];
  }

  filterCate(data?: string){
    if(data){
      this.categoryName = categoryName.filter((item) => item.includes(data));
    }else{
      this.categoryName = categoryName.filter((item) => !(item.includes('outline') || item.includes('sharp')));
    }
    setTimeout(() => {
      this.icon = this.categoryName[this.indexIcon];
      this.scrollIcon.nativeElement.scrollTo(this.savedScrollPosition);
    }, 100);
  }

  back(){
    this.modalCtrl.dismiss();
  }

  chooseIcon(icon: string, index: number){
    this.indexIcon = index;
    this.icon = icon;
    const data = this.categoryName.find((item) => item === icon);
    console.log(data);
  }

  chooseColor(color: string, index: number){
    this.indexColor = index;
    this.color = color;
    console.log(color);
  }
}
