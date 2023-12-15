import { Component, Input } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { StorageService } from '../service/storage.service';
import * as moment from 'moment';
import { Event } from '../model/event';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { SearchEventComponent } from './search-event/search-event.component';
import { ModalSelectTimeComponent } from '../component/modal-select-time/modal-select-time.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @Input() type: "revenue" | "expenditure" | "all" = "revenue";
  dataEvents: Event[] = [];
  dataEventsToDate: Event[] = [];
  dataEvent: Event[] = [];
  numberRevenue: number = 0;
  numberExpenditure: number = 0;
  startTime = moment().startOf('month').toDate();
  endTime = moment().endOf('month').toDate();
  dataChart: number[] = [];
  currency = "VND";
  locale = "vi-VN";
  timeChart: any = "month";
  presentation: string = "month-year";
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
  textLocalTime: string = moment().locale(this.locale).format('MMMM YYYY');
  lineChart: any;
  lineChartRevenue: any[] = [];
  lineChartExpenditure: any[] = [];
  lineChartLabels: string[] = [];
  
  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
    private modal: ModalController,
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
    this.dataEventsToDate = this.dataEvents.filter((item: any) => moment(item.startTime).isBetween(this.startTime.toISOString(), this.endTime.toISOString()));
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
          type: item.category.type,
        });
      }
    });
    this.doughnutChartLabels.forEach((item: any, index) => {
      const data = this.dataEvent.filter((event: any) => event.category.name === item);
      const total = data.reduce((a: any, b: any) => a + (b[this.type] || 0), 0);
      this.dataChart[index] = total;
    });

    // create data line chart
    this.lineChartLabels = [];
    this.lineChartRevenue = [];
    this.lineChartExpenditure = [];
    const dataEventRevenue = this.dataEventsToDate.filter((item: any) => item.type === "revenue");
    const dataEventExpenditure = this.dataEventsToDate.filter((item: any) => item.type === "expenditure");
    if(this.timeChart === "month"){
      for(let i = 1; i <= this.endTime.getDate(); i++){
        this.lineChartLabels[i-1] = i.toString();
        const lstRevenue = dataEventRevenue.filter((item) => {
          if(moment(item.startTime).date() === i){
            return item;
          }
          return null;
        })
        const countRevenue = lstRevenue.reduce((sum, item) => {
          return sum + (item['revenue'] || 0);
        }, 0);
        this.lineChartRevenue[i-1] = countRevenue;

        const lstExpenditure = dataEventExpenditure.filter((item) => {
          if(moment(item.startTime).date() === i){
            return item;
          }
          return null;
        })
        const countExpenditure = lstExpenditure.reduce((sum, item) => {
          return sum + (item['expenditure'] || 0);
        }, 0);
        this.lineChartExpenditure[i-1] = countExpenditure;
      }
    } else if(this.timeChart === "year"){
      for(let i = 0; i < 12; i++){
        this.lineChartLabels[i] = moment().month(i).locale(this.locale).format('MMM');
        const lstRevenue = dataEventRevenue.filter((item) => {
          if(moment(item.startTime).month() === i){
            return item;
          }
          return null;
        })
        const countRevenue = lstRevenue.reduce((sum, item) => {
          return sum + (item['revenue'] || 0);
        }, 0);
        this.lineChartRevenue[i] = countRevenue;

        const lstExpenditure = dataEventExpenditure.filter((item) => {
          if(moment(item.startTime).month() === i){
            return item;
          }
          return null;
        })
        const countExpenditure = lstExpenditure.reduce((sum, item) => {
          return sum + (item['expenditure'] || 0);
        }, 0);
        this.lineChartExpenditure[i] = countExpenditure;
      }
    }

    this.drawChart();
    this.numberExpenditure = this.dataEventsToDate.reduce((a: any, b: any) => a + (b['expenditure'] || 0), 0);
    this.numberRevenue = this.dataEventsToDate.reduce((a: any, b: any) => a + (b['revenue'] || 0), 0);
  }

  async openModalTime() {
    const modal = await this.modal.create({
      component: ModalSelectTimeComponent,
      cssClass: 'modal-select-time',
      componentProps: {
        selectedDate: this.endTime.toISOString(),
        mode: this.timeChart,
        presentation: this.presentation,
        showOptionsTime: false,
      },
    });
    modal.onDidDismiss().then((res) => {
      if(res?.data){
        this.startTime = moment(res.data.dateRange.from).toDate();
        this.endTime = moment(res.data.dateRange.to).toDate();
        if(this.presentation === 'year'){
          this.textLocalTime = moment(this.startTime).locale(this.locale).format('YYYY');
        } else { // month-year
          this.textLocalTime = moment(this.startTime).locale(this.locale).format('MMMM YYYY');
        }
        this.loadData();
      }
    });
    await modal.present();
  }

  drawChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    if (this.lineChart) {
      this.lineChart.destroy();
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
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: [
          {
            label: "Revenue",
            data: this.lineChartRevenue,
            fill: false,
            borderColor: "#109b78",
            tension: 0.1
          },
          {
            label: "Expenditure",
            data: this.lineChartExpenditure,
            fill: false,
            borderColor: "#b63e0e",
            tension: 0.1
          }
        ]
      }
    });
  }

  async detailChart(item: any){
    const modal = await this.modal.create({
      component: CategoryChartComponent,
      componentProps: {
        category: item,
        startTime: this.startTime,
        endTime: this.endTime,
        total: item.number,
        timeChart: this.timeChart,
      }
    });
    modal.onDidDismiss().then(res => {
      this.storage.get("ArrayEvent")?.then((data) => {
        if(data){
          this.dataEvents = data;
          this.loadData();
        }
      });
    });
    await modal.present();
  }

  changeMonth(number: number){
    this.startTime = moment(this.startTime).add(number, this.timeChart).startOf(this.timeChart).toDate();
    this.endTime = moment(this.endTime).add(number, this.timeChart).endOf(this.timeChart).toDate();
    if(this.timeChart === 'year'){
      this.textLocalTime = moment(this.startTime).locale(this.locale).format('YYYY');
      this.presentation = "year";
    } else { // month
      this.textLocalTime = moment(this.startTime).locale(this.locale).format('MMMM YYYY');
      this.presentation = "month-year";
    }
    this.loadData();
  }

  changeTypeChart(data: any){
    if(data?.detail?.value){
      this.timeChart = data.detail.value;
      this.startTime = moment().startOf(this.timeChart).toDate();
      this.endTime = moment().endOf(this.timeChart).toDate();
      if(this.timeChart === 'year'){
        this.textLocalTime = moment(this.startTime).locale(this.locale).format('YYYY');
        this.presentation = "year";
      } else { // month
        this.textLocalTime = moment(this.startTime).locale(this.locale).format('MMMM YYYY');
        this.presentation = "month-year";
      }
      this.loadData();
    }
  }

  async openSearchModal(){
    const modal = await this.modal.create({
      component: SearchEventComponent,
      componentProps: {
        typeTime: this.timeChart
      }
    });
    modal.onDidDismiss().then(res => {
      this.storage.get("ArrayEvent")?.then((data) => {
        if(data){
          this.dataEvents = data;
          this.loadData();
        }
      });
    });
    await modal.present();
  }
}
