import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { CalendarService } from 'src/app/service/calendar.service';
import { StorageService } from 'src/app/service/storage.service';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import * as uuid from 'uuid';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss'],
})
export class CategoryChartComponent  implements OnInit {
  @Input() category: any;
  @Input() total: number = 0;
  @Input() startTime: Date = moment().startOf('month').toDate();
  @Input() endTime: Date = moment().endOf('month').toDate();
  @Input() timeChart: string = "month";
  chart: any;
  eventSource: any[] = [];
  data: any[] = [];
  currency = "VND";
  locale = "vi-VN";
  numberMedium = 0;
  constructor(
    private modalCtrl: ModalController,
    private storage: StorageService,
    private alertCtrl: AlertController,
    private service: CalendarService,
  ) {}

  ngOnInit() {
    this.storage.get("ArrayEvent")?.then((data) => {
      if(data){
        this.eventSource = data;
        this.loadData();
      }
    });
  }

  loadData(){
    this.data = this.eventSource.filter((item) => {
      if(
        moment(item.startTime).isBetween(this.startTime, this.endTime) && 
        item.category.id === this.category.id
      ){
        return item;
      }
    });
    this.data.sort((a, b) => {
      return moment(b.startTime).valueOf() - moment(a.startTime).valueOf();
    });
    let labels: string[] = [];
    let data: number[] = [];
    
    if(this.timeChart === "month"){
      this.numberMedium = this.endTime.getDate();
      for(let i = 1; i <= this.endTime.getDate(); i++){
        labels[i-1] = i.toString();
        const lst = this.data.filter((item) => {
          if(moment(item.startTime).date() === i){
            return item;
          }
        })
        const count = lst.reduce((sum, item) => {
          return sum + item[this.category.type];
        }, 0);
        data[i-1] = count;
      }
    } else if(this.timeChart === "year"){
      this.numberMedium = 12;
      for(let i = 0; i < 12; i++){
        labels[i] = moment().month(i).locale(this.locale).format('MMM');
        const lst = this.data.filter((item) => {
          if(moment(item.startTime).month() === i){
            return item;
          }
        })
        const count = lst.reduce((sum, item) => {
          return sum + item[this.category.type];
        }, 0);
        data[i] = count;
      }
    }

    if(this.chart){
      this.chart.destroy();
    }

    this.chart = new Chart('chart', {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: this.category.name,
          backgroundColor: this.category.color,
          data: data
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          }
        }
      },
    });
  }

  back(){
    this.modalCtrl.dismiss();
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
              this.service.deleteEvent(event.id);
              this.loadData();
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
          this.eventSource = this.eventSource.filter((item: any) => item.id !== data.data.id);
          this.eventSource.push(data.data);
          this.service.updateEvent(data.data);
        } else if(data.role === 'copy'){
          this.eventSource.push(data.data);
          this.service.setEvents(this.eventSource);
        }
        this.loadData();
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
      const lst = this.data.filter((item) => {
        if(moment(item.startTime).valueOf() === moment(data).valueOf()){
          return item;
        }
      });
      return lst.reduce((sum: any, item: any) => {
        return sum + item[this.category.type];
      }, 0);
    }
    return 0;
  }
}
