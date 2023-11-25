import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { Event } from '../model/event';
import { Category } from '../model/category';
import * as uuid from 'uuid';
import { ModalController } from '@ionic/angular';
import { CategoryComponent } from './category/category.component';
import { StorageService } from '../service/storage.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @Input() titlePage: string = "Thêm giao dịch";
  @Input() action: string = "add";
  @Input() date: string = new Date().toISOString();
  @Input() id: string = uuid.v4();
  localID: string = 'vi-VN';
  @Input() title: string = "";
  @Input() revenue: number = 0;
  @Input() expenditure: number = 0;
  @Input() type: "revenue" | "expenditure" = "revenue";
  listCategory: Category[] = [];
  listCategoryRoot: Category[] = [];
  @Input() category: Category = this.listCategory[0];

  constructor(
    private service: CalendarService,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private cateService: CategoryService,
  ) {}

  ngOnInit() {
    setTimeout(async () => {
      await this.storage.get('ArrayCategory')?.then((data) => {
        this.listCategoryRoot = data;
        this.listCategory = this.listCategoryRoot
          .filter((item: Category) => item.type === this.type)
          .sort((a: Category, b: Category) => a.index - b.index);
        if(this.action === "add"){
          this.category = this.listCategory[0];
        }
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

  actionSave() {
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
      id: this.id,
      title: this.title,
      startTime,
      endTime,
      allDay: true,
      expenditure: this.expenditure,
      revenue: this.revenue,
      type: this.type,
      category: this.category,
    }
    
    this.service.getEvents()?.then((events) => {
      if(events && events.length > 0){
        if(this.action === "edit"){
          events = events.filter((item: any) => item.id !== data.id);
        }
        events.push(data);
        this.service.setEvents(events);
      } else {
        this.service.setEvents([data]);
      }
      if(this.action == 'edit'){
        this.modalCtrl.dismiss(data, 'edit');
      } else if(this.action == 'copy'){
        this.modalCtrl.dismiss(data, 'copy');
      }
    });
    this.reset();
  }

  chooseCate(category: Category) {
    this.category = category;
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

    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });
    await modal.present();
  }

  back() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
