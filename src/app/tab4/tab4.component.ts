import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PageAddComponent } from './page-add/page-add.component';
import { CalendarService } from '../service/calendar.service';
import { Event } from '../model/event';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component  implements OnInit {
  type: string = 'borrow';
  search: string = '';
  data: Event[] = [];
  constructor(
    private modalCtrl: ModalController,
    private calService: CalendarService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.calService.getEvents()?.then((data: Event[]) => {
        if(data?.length > 0){
          this.data = data.filter((item: Event) => {
            if(item.type2 == this.type){
              return item;
            } else {
              return null;
            }
          });
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
    //this.loadData();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: PageAddComponent,
      componentProps: {
        type: this.type,
      },
    });
    modal.onDidDismiss().then((res) => {
      if(res.role == 'accept'){
        this.loadData();
      }
    });
    modal.present();
  }
}
