import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarService } from 'src/app/service/calendar.service';
import * as uuid from 'uuid';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import * as moment from 'moment';
import { ModalCategoryComponent } from 'src/app/component/modal-category/modal-category.component';
import { ModalSelectTimeComponent } from 'src/app/component/modal-select-time/modal-select-time.component';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss'],
})
export class SearchEventComponent  implements OnInit {
  eventSource: any[] = [];
  eventSourceRoot: any[] = [];
  currency: string = 'VND';
  filter: string = "";
  locale = "vi-VN";
  search: string = "";
  listFilterCategory: Category[] = [];
  textCategory: string = "Danh mục";
  haveCategory: boolean = false;
  iconCategory: string = "grid-outline";
  startTime: any;
  endTime: any;
  equalDate: boolean = false;
  @Input() typeTime: any = "month";
  presentation: string = "month-year";
  selectedDate: string = new Date().toISOString();
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private service: CalendarService,
  ) { }

  ngOnInit() {
    this.startTime = moment().startOf(this.typeTime).toDate();
    this.endTime = moment().endOf(this.typeTime).toDate();
    if(this.typeTime === 'year'){
      this.presentation = 'year';
    }
    this.loadData();
  }

  loadData() {
    this.service.getEvents()?.then((data: any) => {
      if (data) {
        data.sort((a: any, b: any) => {
          return moment(b.startTime).valueOf() - moment(a.startTime).valueOf();
        });
        this.eventSource = [...data];
        this.eventSourceRoot =  [...data];
        if(this.filter !== ""){
          this.eventSource = this.eventSourceRoot.filter((item: any) => {
            return item.type === this.filter;
          });
        } else {
          this.eventSource = this.eventSourceRoot;
        }
        if(this.search !== ""){
          this.eventSource = this.eventSource.filter((item: any) => {
            return item.title.toLowerCase().includes(this.search.toLowerCase());
          });
        }
        if(this.listFilterCategory.length > 0){
          this.eventSource = this.eventSource.filter((item: any) => {
            const index = this.listFilterCategory.findIndex((cate) => {
              return cate.id === item.category.id;
            });
            if(index !== -1){
              return item;
            }
          });
        }
        if(this.startTime && this.endTime){
          this.eventSource = this.eventSource.filter((item: any) => {
            if(moment(item.startTime).isBetween(this.startTime, this.endTime)){
              return item;
            }
          });
        }
      }
    });
  }

  searchEvent(data: any) {
    this.search = data.detail.value;
    this.loadData();
  }

  back() {
    this.modalCtrl.dismiss();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 500);
  }

  filterData(data: string) {
    if(this.filter === data){
      this.filter = "";
      this.loadData();
    } else {
      this.filter = data;
      this.loadData();
    }
  }

  async filterTime() {
    const modal = await this.modalCtrl.create({
      component: ModalSelectTimeComponent,
      cssClass: 'modal-select-time',
      componentProps: {
        type: this.filter,
        mode: this.typeTime,
        presentation: this.presentation,
        dateRange: {
          from: this.startTime.toISOString(),
          to: this.endTime.toISOString(),
        },
        selectedDate: this.selectedDate,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data.role === 'accept'){
        if(data.data) {
          this.presentation = data.data.presentation;
          this.typeTime = data.data.mode;
          this.selectedDate = data.data.selectedDate;
          this.startTime = new Date(data.data.dateRange.from);
          this.endTime = new Date(data.data.dateRange.to);
          this.equalDate = moment(this.startTime).isSame(this.endTime, "day");
          this.loadData();
        }
      }
    });
    await modal.present();
  }

  async filterCategory() {
    const modal = await this.modalCtrl.create({
      component: ModalCategoryComponent,
      componentProps: {
        listFilterCategory: this.listFilterCategory,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data.role === 'accept'){
        this.listFilterCategory = data.data;
        if(this.listFilterCategory.length === 0){
          this.textCategory = "Danh mục";
          this.haveCategory = false;
          this.iconCategory = "grid-outline";
        } else if(this.listFilterCategory.length === 1){
          this.textCategory = this.listFilterCategory[0].name;
          this.haveCategory = true;
          this.iconCategory = this.listFilterCategory[0].icon;
        } else {
          this.textCategory = "Danh mục" + " (" + this.listFilterCategory.length + ")";
          this.haveCategory = true;
          this.iconCategory = "grid-outline";
        }
        this.loadData();
      }
    });
    await modal.present();
  }

  async viewDetail(event: any, action: string){
    let titlePage = "";
    if(action === 'delete'){
      const alert = await this.alertCtrl.create({
        header: 'Bạn có chắc chắn muốn xóa sự kiện này?',
        buttons: [
          {
            text: 'Bỏ qua',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Xóa',
            role: 'confirm',
            handler: () => {
              this.eventSource = this.eventSource.filter((item: any) => item.id !== event.id);
              this.eventSourceRoot = this.eventSourceRoot.filter((item: any) => item.id !== event.id);
              this.service.setEvents(this.eventSourceRoot);
            },
          }
        ],
      });
  
      await alert.present();
    } else {
      switch (action) {
        case "edit":
          titlePage = "Chỉnh sửa";
          break;
        case "copy":
          titlePage = "Sao chép";
          break;
      }
      const modal = await this.modalCtrl.create({
        component: Tab1Page,
        componentProps: {
          titlePage: titlePage,
          action: action,
          id: action == 'edit' ? event.id : uuid.v4(),
          type: event.type,
          title: event.title,
          expenditure: event.expenditure,
          revenue: event.revenue,
          date: event.startTime.toISOString(),
          category: event.category,
        }
      });
      modal.onDidDismiss().then((data) => {
        if(data.role === 'edit'){
          const index = this.eventSource.findIndex((item: any) => item.id === data.data.id);
          const index2 = this.eventSourceRoot.findIndex((item: any) => item.id === data.data.id);
          if(index !== -1){
            this.eventSource[index] = data.data;
          }
          if(index2 !== -1){
            this.eventSourceRoot[index] = data.data;
          }
          this.service.setEvents(this.eventSourceRoot);
        } else if(data.role === 'copy'){
          this.eventSource.push(data.data);
          this.eventSourceRoot.push(data.data);
          this.service.setEvents(this.eventSourceRoot);
        }
      });
      await modal.present();
    }
  }

  ReturnTitle(data: any){
    if(data){
      return moment(data).locale(this.locale).format('dddd, DD MMMM YYYY');
    }
    return "";
  }

  totalOfTime(data: any){
    if(data){
      const lst = this.eventSource.filter((item) => {
        if(moment(item.startTime).valueOf() === moment(data).valueOf()){
          return item;
        }
      });
      return lst.reduce((sum: any, item: any) => {
        return sum + item.expenditure + item.revenue;
      }, 0);
    }
    return 0;
  }
}
