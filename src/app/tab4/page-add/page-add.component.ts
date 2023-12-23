import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Event } from 'src/app/model/event';
import * as uuid from 'uuid';

@Component({
  selector: 'app-page-add',
  templateUrl: './page-add.component.html',
  styleUrls: ['./page-add.component.scss'],
})
export class PageAddComponent  implements OnInit {
  textTitle: string = '';
  @Input() type2: "loan" | "borrow" = 'loan';
  @Input() ownerOfType2: string = '';
  @Input() expenditure = 0;
  @Input() revenue = 0;
  @Input() title: string = '';
  @Input() action: string = 'add';
  @Input() titlePage: string = '';
  @Input() id: string = '';
  @Input() date: string = new Date().toISOString();
  titelInputType2: string = '';
  ionicForm: FormGroup = new FormGroup({});
  textError: string = 'Vui lòng nhập đầy đủ thông tin';
  isError: boolean = false;
  localID = 'vi-VN';

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    if(this.action != 'edit') {
      this.id = uuid.v4();
    }
    switch (this.type2) {
      case 'loan':
        this.textTitle = this.titlePage ? this.titlePage : 'Thêm khoản cho vay';
        this.titelInputType2 = 'Người vay';
        break;
      case 'borrow':
        this.textTitle = this.titlePage ? this.titlePage : 'Thêm khoản đi vay';
        this.titelInputType2 = 'Người cho vay';
        break;
      default:
        break;
    }
    this.ionicForm = this.formBuilder.group({
      ownerOfType2: [
        this.ownerOfType2 ? this.ownerOfType2 :'', 
        [Validators.required]
      ],
      title: [this.title ? this.title :''],
      money: [
        this.type2 == 'loan' ? this.expenditure : this.revenue, 
        [Validators.required]
      ],
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  submitForm = () => {
    if (this.ionicForm.valid) {
      var date = this.date ? new Date(this.date) : new Date();
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
        id: this.id,
        title: this.ionicForm.value.title,
        startTime,
        endTime,
        allDay: true,
        expenditure: this.type2 === 'loan' ? this.ionicForm.value.money : 0,
        revenue: this.type2 === 'borrow' ? this.ionicForm.value.money : 0,
        type: this.type2 === 'loan' ? 'expenditure' : 'revenue',
        category: this.type2 === 'loan' ? 
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
        type2: this.type2,
        ownerOfType2: this.ionicForm.value.ownerOfType2,
      };
      this.isError = false;
      this.modalCtrl.dismiss(event, this.action);
    } else {
      this.isError = true;
    }
  };
}
