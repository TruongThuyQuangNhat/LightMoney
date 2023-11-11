import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';
import * as moment from 'moment';
import { CalendarService } from '../service/calendar.service';
import { Subject, takeUntil } from 'rxjs';
import * as uuid from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  @ViewChild(CalendarComponent) cal: CalendarComponent | undefined;
  eventSource: any[] = [];
  eventOfDate: any[] = [];
  viewTitle: string = '';
  localID: string = 'vi-VN';
  currency: string = 'VND';
  isToday: boolean = true;
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  totalExpenditure: number = 0;
  totalRevenue: number = 0;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private detec: ChangeDetectorRef,
    private service: CalendarService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    this.route.queryParams.subscribe((params) => {
      setTimeout(() => {
        this.service.getEvents()?.then((data) => {
          if(data && data.length > 0) {
            this.eventSource = data;
            this.cal?.loadEvents();
          }
        });
      }, 10);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    // this.loadEvents();
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
    this.service.setEvents(this.eventSource);
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }

  onEventSelected(event: any) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
  }

  changeMode(mode: CalendarMode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
    this.detec.detectChanges();
  }

  onTimeSelected(ev: any) {
    this.eventOfDate = this.eventSource.filter((event) => {
      return (
        moment(event.startTime).format('YYYY-MM-DD') ===
        moment(ev.selectedTime).format('YYYY-MM-DD')
      );
    });
    this.totalExpenditure = this.eventOfDate.reduce((acc: number, curr: any) => {
      return acc + curr.expenditure;
    }, 0);
    this.totalRevenue = this.eventOfDate.reduce((acc: number, curr: any) => {
      return acc + curr.revenue;
    }, 0);
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      startTime = new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate() + startDay
        )
      );
      if (endDay === startDay) {
        endDay += 1;
      }
      endTime = new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate() + endDay
        )
      );
      
      events.push({
        id: uuid.v4(),
        title: 'All Day - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: true,
        expenditure: Math.floor(Math.random() * 10000),
        revenue: 0,
        type: 'expenditure',
        category: {
          icon: "fast-food-outline",
          name: "Ăn vặt",
          color: "#f96161",
          type: "expenditure",
          isDefault: true
      },
      });
      events.push({
        id: uuid.v4(),
        title: 'All Day - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: true,
        revenue: Math.floor(Math.random() * 10000),
        expenditure: 0,
        type: 'revenue',
        category: {
          icon: "wallet-outline",
          name: "Thu nhập khác",
          color: "#5085a5",
          type: "revenue",
          isDefault: true
      },
      });
    }
    return events;
  }

  onRangeChanged(ev: any) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  convertExpenditure(view: any, index: number){
    const result = view?.dates[index]?.events?.reduce((acc: number, curr: any) => {
      return acc + curr.expenditure;
    }, 0);
    if(result === 0) return "";
    return result.toLocaleString(this.localID);

  }

  convertRevenue(view: any, index: number){
    const result = view?.dates[index]?.events?.reduce((acc: number, curr: any) => {
      return acc + curr.revenue;
    }, 0);
    if(result === 0) return "";
    return result.toLocaleString(this.localID);
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
        this.cal?.loadEvents();
        this.service.setEvents(this.eventSource);
      } else if(data.role === 'copy'){
        this.eventSource.push(data.data);
        this.cal?.loadEvents();
        this.service.setEvents(this.eventSource);
      }
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
            this.cal?.loadEvents();
            this.service.setEvents(this.eventSource);
          },
        }
      ],
    });

    await alert.present();
  }
}
