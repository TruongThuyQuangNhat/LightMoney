import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Event } from 'src/app/model/event';
import * as uuid from 'uuid';

@Component({
  selector: 'app-page-add-history',
  templateUrl: './page-add-history.component.html',
  styleUrls: ['./page-add-history.component.scss'],
})
export class PageAddHistoryComponent  implements OnInit {
  ionicForm: FormGroup = new FormGroup({});
  textError: string = 'Vui lòng nhập đầy đủ thông tin';
  isError: boolean = false;
  textTitle: string = '';
  date: string = new Date().toISOString();
  localID = 'vi-VN';
  titelInputType2: string = '';
  @Input() ownerOfType2: string = '';
  @Input() title: string = '';
  @Input() type2: "debtCollection" | "debtRepayment" = 'debtCollection';
  @Input() expenditure: string = '';
  @Input() revenue: string = '';
  @Input() action: string = 'add';
  @Input() id: string = '';
  @Input() parentId: string = '';
  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    if(this.action != 'edit') {
      this.id = uuid.v4();
    }
    switch (this.type2) {
      case 'debtRepayment':
        this.textTitle = 'Trả tiền vay';
        this.titelInputType2 = 'Người cho vay';
        break;
      case 'debtCollection':
        this.textTitle = 'Thu tiền cho vay';
        this.titelInputType2 = 'Người vay';
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
        this.type2 == 'debtCollection' ? this.expenditure : this.revenue, 
        [Validators.required]
      ],
    });
  }

  submitForm() {
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
        expenditure: this.type2 === 'debtRepayment' ? this.ionicForm.value.money : 0,
        revenue: this.type2 === 'debtCollection' ? this.ionicForm.value.money : 0,
        type: this.type2 === 'debtRepayment' ? 'expenditure' : 'revenue',
        category: this.type2 === 'debtRepayment' ? 
          {
            id: "eb3a3070-fe83-4cd5-844a-ee18e7cb24d4",
            icon: "receipt-outline",
            name: "Trả nợ",
            color: "#ccff33",
            type: "expenditure",
            isDefault: true,
            index: 33,
            typeIcon: "outline",
          } : {
            id: "9615bb17-4eb9-4fa3-9425-16d4fca7bff2",
            icon: "albums-outline",
            name: "Thu nợ",
            color: "#3366cc",
            type: "revenue",
            isDefault: true,
            typeIcon: "outline",
            index: 9
          },
        type2: this.type2,
        ownerOfType2: this.ionicForm.value.ownerOfType2,
        parentId: this.parentId,
      };
      this.isError = false;
      this.modalCtrl.dismiss(event, this.action);
    } else {
      this.isError = true;
    }
  };

  back() {
    this.modalCtrl.dismiss();
  }
}
