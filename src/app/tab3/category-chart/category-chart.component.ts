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
  @Input() startTime: Date = moment().startOf('month').toDate();
  @Input() endTime: Date = moment().endOf('month').toDate();
  chart: any;
  eventSource: any[] = [];
  data: any[] = [];
  currency = "VND";
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
      return moment(a.startTime).valueOf() - moment(b.startTime).valueOf();
    });
    this.chart = new Chart('chart', {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [{
          label: this.category.name,
          backgroundColor: this.category.color,
          data: [2478, 5267, 734, 784, 433, 2478, 5267, 734, 784, 433, 2478, 5267]
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

  async viewDetail(event: any, action: string, slidingItem?: IonItemSliding){
    slidingItem ? slidingItem.close() : null;
    let titlePage = "";
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
        this.service.setEvents(this.eventSource);
      } else if(data.role === 'copy'){
        this.eventSource.push(data.data);
        this.service.setEvents(this.eventSource);
      }
      this.loadData();
    });
    await modal.present();
  }

  async delete(event: any, slidingItem: IonItemSliding){
    slidingItem.close();
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
            this.service.setEvents(this.eventSource);
            this.loadData();
          },
        }
      ],
    });

    await alert.present();
  }
}
