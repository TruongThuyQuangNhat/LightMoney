import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { StorageService } from '../service/storage.service';
import * as moment from 'moment';
import { Event } from '../model/event';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @Input() type: "revenue" | "expenditure" = "revenue";
  dataEvents: Event[] = [];
  dataEventsToDate: Event[] = [];
  startTime = moment().startOf('day').toDate();
  endTime = moment().endOf('day').toDate();
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [350, 450, 100] }],
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  
  constructor(
    private storage: StorageService
  ) {
    setTimeout(() => {
      this.storage.get("ArrayEvent")?.then((data) => {
        if(data){
          this.dataEvents = data;
          this.dataEventsToDate = data.filter((item: any) => moment(item.startTime).isBetween(this.startTime, this.endTime));
          console.log(this.dataEventsToDate);
        }
      });
    }, 10);
  }

  changeSegment(data: any) {
    if(data?.detail?.value){
      this.type = data.detail.value;
    }
  }


}
