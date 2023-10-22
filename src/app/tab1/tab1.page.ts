import { Component } from '@angular/core';
import { CalendarService } from '../service/calendar.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  date: string = new Date().toISOString();
  localID: string = 'vi-VN';
  title: string = "";
  revenue: number = 0;
  expenditure: number = 0;
  constructor(
    private service: CalendarService,
  ) {}

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
    const data = {
      title: this.title,
      startTime,
      endTime,
      allDay: true,
      expenditure: this.expenditure,
      revenue: this.revenue
    }
    this.service.addEvent(data);
  }
}
