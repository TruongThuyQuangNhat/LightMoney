import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { Event } from '../model/event';
import { Category } from '../model/category';
import * as uuid from 'uuid';
import { ModalController } from '@ionic/angular';
import { CategoryComponent } from './category/category.component';
import { StorageService } from '../service/storage.service';
import { CategoryService } from '../service/category.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  titlePage: string = "Thêm giao dịch";
  date: string = new Date().toISOString();
  localID: string = 'vi-VN';
  title: string = "";
  revenue: number = 0;
  expenditure: number = 0;
  type: "revenue" | "expenditure" = "revenue";
  listCategory: Category[] = [];
  listCategoryRoot: Category[] = [];
  category: Category = this.listCategory[0];
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private service: CalendarService,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private cateService: CategoryService,
  ) {
    this.cateService.reloadCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (data) => {
        if(data){
          this.ngOnInit();
        }
      });
  }

  ngOnInit() {
    setTimeout(async () => {
      await this.storage.get('ArrayCategory')?.then((data) => {
        this.listCategoryRoot = data;
        this.listCategory = this.listCategoryRoot
          .filter((item: Category) => item.type === this.type)
          .sort((a: Category, b: Category) => a.index - b.index);
        this.category = this.listCategory[0];
      });
    }, 10);
  }

  changeSegment(data: any) {
    if(data?.detail?.value){
      this.type = data.detail.value;
      this.listCategory = this.listCategoryRoot
        .filter((item) => item.type === this.type)
        .sort((a: Category, b: Category) => a.index - b.index);
      this.category = this.listCategory[0];
    }
  }

  action() {
    var date = new Date(this.date);
    const startTime = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      )
    );
    const endTime = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + 1
      )
    );
    const data: Event = {
      id: uuid.v4(),
      title: this.title,
      startTime,
      endTime,
      allDay: true,
      expenditure: this.expenditure,
      revenue: this.revenue,
      type: this.type,
      category: this.category,
    }
    this.service.addEvent(data);
    this.reset();
  }

  chooseCate(category: Category) {
    this.category = category;
    console.log(this.category);
  }

  reset() {
    this.title = "";
    this.revenue = 0;
    this.expenditure = 0;

  }

  async editCate(){
    const modal = await this.modalCtrl.create({
      component: CategoryComponent,
      componentProps: {
        type: this.type
      }
    });

    modal.onDidDismiss().then((data) => {});
    await modal.present();
  }
}
