import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion7-calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-select-time',
  templateUrl: './modal-select-time.component.html',
  styleUrls: ['./modal-select-time.component.scss'],
})
export class ModalSelectTimeComponent  implements OnInit {
  @Input() dateMin: string = ""; // Format: YYYY-MM-DD or YYYY
  @Input() dateMax: string = ""; // Format: YYYY-MM-DD or YYYY
  @Input() selectedDate: string = new Date().toISOString();
  @Input() dateRange: { from: string; to: string } = {
    from: new Date().toISOString(),
    to: new Date().toISOString(),
  };
  @Input() mode: 'day' | 'month' | 'year' | 'range' = 'month';
  @Input() presentation: 'date' | 'month-year' | 'year' = 'month-year';

  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
  };
  isoFormat = 'YYYY-MM-DD[T]HH:mm:ss';
  
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  today() {
    const today = new Date();
    this.selectedDate = today.toISOString();
  }

  changeOption(e: any) {
    this.mode = e?.detail?.value;
    switch (this.mode) {
      case 'day':
        this.presentation = 'date';
        break;
      case 'month':
        this.presentation = 'month-year';
        break;
      case 'year':
        this.presentation = 'year';
        break;
      case 'range':
        this.presentation = 'date';
        break;
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  accept() {
    if (this.mode == 'range') {
      if (this.dateRange.from && this.dateRange.to) {
        let response = {
          mode: this.mode,
          selectedDate: this.selectedDate,
          dateRange: this.dateRange,
        };
        this.modalCtrl.dismiss(response, 'accept');
      }
    } else {
      if (this.selectedDate) {
        let tempDate = moment(this.selectedDate, true);
        if (tempDate.isValid()) {
          let from = moment(tempDate).startOf(this.mode).toDate();
          let to = moment(tempDate).endOf(this.mode).toDate();
          let response = {
            mode: this.mode,
            selectedDate: this.selectedDate,
            dateRange: { from: from.toISOString(), to: to.toISOString() },
          };
          this.modalCtrl.dismiss(response, 'accept');
        }
      }
    }
  }
}
