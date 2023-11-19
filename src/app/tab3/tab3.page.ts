import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartType, ChartOptions } from 'chart.js';
import { StorageService } from '../service/storage.service';
import * as moment from 'moment';
import { Event } from '../model/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @Input() type: "revenue" | "expenditure" = "revenue";
  dataEvents: Event[] = [];
  dataEventsToDate: Event[] = [];
  dataEvent: Event[] = [];
  numberRevenue: number = 0;
  numberExpenditure: number = 0;
  startTime = moment().startOf('month').toDate();
  endTime = moment().endOf('month').toDate();
  dataChart: number[] = [];
  currency = "VND";
  doughnutChartLabels: string[] = [];
  doughnutChartColor: string[] = [];
  doughnutChartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  chartInstance: any;
  listCategory: any[] = [];
  
  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      setTimeout(() => {
        this.storage.get("ArrayEvent")?.then((data) => {
          if(data){
            this.dataEvents = data;
            this.loadData();
          }
        });
      }, 10);
    });
  }

  changeSegment(data: any) {
    if(data?.detail?.value){
      this.type = data.detail.value;
      this.loadData();
    }
  }

  changeDate(event: any){
    const date = new Date(event?.detail?.value);
    this.startTime = moment(date).startOf('month').toDate();
    this.endTime = moment(date).endOf('month').toDate();
    this.loadData();
  }

  loadData(){
    this.doughnutChartLabels = [];
    this.dataChart = [];
    this.doughnutChartColor = [];
    this.listCategory = [];
    this.dataEventsToDate = this.dataEvents.filter((item: any) => moment(item.startTime).isBetween(this.startTime, this.endTime));
    this.dataEvent = this.dataEventsToDate.filter((item: any) => item.type === this.type);
    this.dataEvent.forEach((item: any) => {
      if(!this.doughnutChartLabels.includes(item.category.name)){
        this.doughnutChartLabels.push(item.category.name);
        this.doughnutChartColor.push(item.category.color);
      }
      const number = item[this.type] || 0;
      const index = this.listCategory.findIndex((cate: any) => cate.id === item.category.id);
      if(index > -1){
        this.listCategory[index].number += number;
      } else {
        this.listCategory.push({
          icon: item.category.icon,
          id: item.category.id,
          name: item.category.name,
          color: item.category.color,
          number: number,
        });
      }
    });
    this.doughnutChartLabels.forEach((item: any, index) => {
      const data = this.dataEvent.filter((event: any) => event.category.name === item);
      const total = data.reduce((a: any, b: any) => a + (b[this.type] || 0), 0);
      this.dataChart[index] = total;
    });
    this.drawChart();
    this.numberExpenditure = this.dataEventsToDate.reduce((a: any, b: any) => a + (b['expenditure'] || 0), 0);
    this.numberRevenue = this.dataEventsToDate.reduce((a: any, b: any) => a + (b['revenue'] || 0), 0);
  }

  drawChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.chartInstance = new Chart('chartInstance', {
      type: 'doughnut',
      data: {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: this.dataChart,
            backgroundColor: this.doughnutChartColor,
          },
        ],
      },
      options: this.doughnutChartOptions,
    });
  }
}
