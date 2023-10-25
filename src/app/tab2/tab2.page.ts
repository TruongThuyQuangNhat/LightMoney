import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic2-calendar';
import * as moment from 'moment';
import { CalendarService } from '../service/calendar.service';
import { Subject, takeUntil } from 'rxjs';

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
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private detec: ChangeDetectorRef,
    private service: CalendarService,
  ) {
    this.service.eventSource$.pipe(takeUntil(this.destroy$))
    .subscribe((event) => {
      if(!event) return;
      this.eventSource.push(event);
      this.cal?.loadEvents();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
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
        title: 'All Day - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: true,
        expenditure: Math.floor(Math.random() * 10000),
        revenue: 0,
        type: 'expenditure',
        category: {
          icon: "assets/icon-category/add.svg",
          name: "add",
          color: "#F44336",
        }
      });
      events.push({
        title: 'All Day - ' + i,
        startTime: startTime,
        endTime: endTime,
        allDay: true,
        revenue: Math.floor(Math.random() * 10000),
        expenditure: 0,
        type: 'revenue',
        category: {
          icon: "assets/icon-category/add.svg",
          name: "add",
          color: "#F44336",
        }
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
}
