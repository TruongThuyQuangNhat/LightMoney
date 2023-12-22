import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Event } from 'src/app/model/event';
import { CalendarService } from 'src/app/service/calendar.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-page-add',
  templateUrl: './page-add.component.html',
  styleUrls: ['./page-add.component.scss'],
})
export class PageAddComponent  implements OnInit {
  textTitle: string = '';
  @Input() type: "loan" | "borrow" = 'loan';
  titelInputType2: string = '';
  ionicForm: FormGroup = new FormGroup({});
  local = 'vi-VN';
  textCreatedOn: string = moment().locale(this.local).format('DD MMMM YYYY');
  textError: string = 'Vui lòng nhập đầy đủ thông tin';
  isError: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private calService: CalendarService,
  ) {}

  ngOnInit() {
    switch (this.type) {
      case 'loan':
        this.textTitle = 'Thêm khoản cho vay';
        this.titelInputType2 = 'Người vay';
        break;
      case 'borrow':
        this.textTitle = 'Thêm khoản đi vay';
        this.titelInputType2 = 'Người cho vay';
        break;
      default:
        break;
    }
    this.ionicForm = this.formBuilder.group({
      ownerOfType2: ['', [Validators.required]],
      title: [''],
      money: [null, [Validators.required]],
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  submitForm = () => {
    if (this.ionicForm.valid) {
      var date = new Date();
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
      const event: Event = {
        id: uuid.v4(),
        title: this.ionicForm.value.title,
        startTime,
        endTime,
        allDay: true,
        expenditure: this.type === 'loan' ? this.ionicForm.value.money : 0,
        revenue: this.type === 'borrow' ? this.ionicForm.value.money : 0,
        type: this.type === 'loan' ? 'expenditure' : 'revenue',
        category: this.type === 'loan' ? 
            {
              id: "e4f2f979-ad7d-493c-ba8e-9982948d58e2",
              icon: "reader-outline",
              name: "Cho vay",
              color: "#0000ff",
              type: "expenditure",
              isDefault: true,
              index: 32,
              typeIcon: "outline",
            } : {
              id: "80622438-75c4-487b-b817-0e30bc96d3af",
              icon: "document-text-outline",
              name: "Đi vay",
              color: "#669999",
              type: "revenue",
              isDefault: true,
              typeIcon: "outline",
              index: 8
            },
        type2: this.type,
        ownerOfType2: this.ionicForm.value.ownerOfType2,
      };
      this.calService.setEvent(event);
      this.isError = false;
      this.modalCtrl.dismiss(true, 'accept');
    } else {
      this.isError = true;
    }
  };
}
