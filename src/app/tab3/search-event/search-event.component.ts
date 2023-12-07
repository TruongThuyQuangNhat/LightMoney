import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarService } from 'src/app/service/calendar.service';
import * as uuid from 'uuid';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import * as moment from 'moment';
import { ModalCategoryComponent } from 'src/app/component/modal-category/modal-category.component';
import { ModalSelectTimeComponent } from 'src/app/component/modal-select-time/modal-select-time.component';

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
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private service: CalendarService,
  ) { }

  ngOnInit() {
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
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data.role === 'accept'){
        //
      }
    });
    await modal.present();
  }

  async filterCategory() {
    const modal = await this.modalCtrl.create({
      component: ModalCategoryComponent,
      componentProps: {
        type: this.filter,
      }
    });
    modal.onDidDismiss().then((data) => {
      if(data.role === 'accept'){
        //
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
      return moment(data).locale(this.locale).format('DD MMMM YYYY');
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
