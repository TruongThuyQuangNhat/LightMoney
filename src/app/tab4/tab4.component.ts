import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PageAddComponent } from './page-add/page-add.component';
import { CalendarService } from '../service/calendar.service';
import { Event } from '../model/event';
import * as uuid from 'uuid';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component  implements OnInit {
  type: string = 'borrow';
  search: string = '';
  eventSource: Event[] = [];
  eventSourceRoot: Event[] = [];
  constructor(
    private modalCtrl: ModalController,
    private calService: CalendarService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.calService.getEvents()?.then((data: Event[]) => {
        if(data?.length > 0){
          let temp = data.filter((item: Event) => {
            if(item.type2 == this.type){
              if(this.search){
                if(item?.title?.toLowerCase().includes(this.search.toLowerCase()) || 
                  item?.ownerOfType2?.toLowerCase().includes(this.search.toLowerCase())
                ){
                  return item;
                } else {
                  return null;
                }
              } else {
                return item;
              }
            } else {
              return null;
            }
          });
          this.eventSource = [...temp];
          this.eventSourceRoot = [...temp];
        }
      });
    }, 10);
  }

  changeSegment(ev: any) {
    this.type = ev.detail.value;
    this.loadData();
  }

  searchEvent(data: any) {
    this.search = data.detail.value;
    this.loadData();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: PageAddComponent,
      componentProps: {
        type2: this.type,
      },
    });
    modal.onDidDismiss().then((res) => {
      if(res.role == 'add'){
        this.calService.setEvent(res.data);
        this.eventSource.push(res.data);
        this.eventSourceRoot.push(res.data);
      }
    });
    modal.present();
  }

  async viewDetail(event: any, action: string){
    let titlePage = "";
    if(action === 'delete'){
      const alert = await this.alertCtrl.create({
        header: 'Bạn có chắc chắn muốn xóa sự kiện này và lịch sử của nó?',
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
              this.eventSource = this.eventSource.filter((item: any) => item.id !== event.id);
              this.eventSourceRoot = this.eventSourceRoot.filter((item: any) => item.id !== event.id);
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
        component: PageAddComponent,
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
          ownerOfType2: event.ownerOfType2,
          parentId: event.parentId,
          type2: event.type2,
        }
      });
      modal.onDidDismiss().then((data) => {
        if(data.role === 'edit'){
          const index = this.eventSource.findIndex((item: any) => item.id === data.data.id);
          const index2 = this.eventSourceRoot.findIndex((item: any) => item.id === data.data.id);
          if(index !== -1){
            this.eventSource[index] = data.data;
          }
          if(index2 !== -1){
            this.eventSourceRoot[index] = data.data;
          }
          this.calService.updateEvent(data.data);
        } else if(data.role === 'copy'){
          this.eventSource.push(data.data);
          this.eventSourceRoot.push(data.data);
          this.calService.setEvent(data.data);
        }
      });
      await modal.present();
    }
  }
}
