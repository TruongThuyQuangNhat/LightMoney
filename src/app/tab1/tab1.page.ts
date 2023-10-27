import { Component } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { Event } from '../model/event';
import { Category, listCategory } from '../model/category';
import * as uuid from 'uuid';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  titlePage: string = "Thêm giao dịch";
  date: string = new Date().toISOString();
  localID: string = 'vi-VN';
  title: string = "";
  revenue: number = 0;
  expenditure: number = 0;
  type: "revenue" | "expenditure" = "revenue";
  listCategory: Category[] = listCategory;
  category: Category = this.listCategory[0];
  constructor(
    private service: CalendarService,
  ) {}

  changeSegment(data: any) {
    if(data?.detail?.value){
      this.type = data.detail.value;
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
}
