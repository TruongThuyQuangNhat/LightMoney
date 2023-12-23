import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Event } from 'src/app/model/event';
import * as uuid from 'uuid';
import { PageAddHistoryComponent } from '../page-add-history/page-add-history.component';
import { CalendarService } from 'src/app/service/calendar.service';

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
  listHistory: Event[] = [];

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private calService: CalendarService,
    private alertCtrl: AlertController,
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
    this.loadChildren(this.id);
  }

  loadChildren(id: string) {
    setTimeout(() => {
      this.calService.loadChildren(id)?.then((data) => {
        this.listHistory = data;
      });
    }, 10);
  }

  back() {
    this.modalCtrl.dismiss();
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

  async addHistory() {
    const modal = await this.modalCtrl.create({
      component: PageAddHistoryComponent,
      componentProps: {
        type2: this.type2 === 'loan' ? 'debtCollection' : 'debtRepayment',
        parentId: this.id,
        ownerOfType2: this.ionicForm.value.ownerOfType2,
      },
    });

    modal.onDidDismiss().then((data) => {
      if(data.role === 'add'){
        this.listHistory.push(data.data);
        this.calService.setEvent(data.data);
      }
    });

    await modal.present();
  }

  async viewDetail(event: any, action: string){
    let titlePage = "";
    if(action === 'delete'){
      const alert = await this.alertCtrl.create({
        header: 'Bạn có chắc chắn muốn xóa sự kiện này?',
        buttons: [
          {
            text: 'Bỏ qua',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Xóa',
            role: 'confirm',
            handler: () => {
              this.listHistory = this.listHistory.filter((item: any) => item.id !== event.id);
              this.calService.deleteEvent(event.id);
            },
          }
        ],
      });
  
      await alert.present();
    } else {
      switch (action) {
        case "edit":
          titlePage = "Chỉnh sửa";
          break;
        case "copy":
          titlePage = "Sao chép";
          break;
      }
      const modal = await this.modalCtrl.create({
        component: PageAddHistoryComponent,
        componentProps: {
          titlePage: titlePage,
          action: action,
          id: action == 'edit' ? event.id : uuid.v4(),
          type: event.type,
          title: event.title,
          expenditure: event.expenditure,
          revenue: event.revenue,
          date: event.startTime.toISOString(),
          category: event.category,
          ownerOfType2: this.ionicForm.value.ownerOfType2,
          parentId: this.id,
          type2: this.type2 === 'loan' ? 'debtCollection' : 'debtRepayment',
        }
      });
      modal.onDidDismiss().then((data) => {
        console.log(data);
        if(data.role === 'edit'){
          const index = this.listHistory.findIndex((item: any) => item.id === data.data.id);
          if(index !== -1){
            this.listHistory[index] = data.data;
          }
          this.calService.updateEvent(data.data);
        } else if(data.role === 'copy'){
          this.listHistory.push(data.data);
          this.calService.setEvent(data.data);
        }
      });
      await modal.present();
    }
  }
}
