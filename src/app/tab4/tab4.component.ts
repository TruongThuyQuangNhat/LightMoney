import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PageAddComponent } from './page-add/page-add.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component  implements OnInit {
  type: string = 'borrow';
  search: string = '';
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}


  changeSegment(ev: any) {
    this.type = ev.detail.value;
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
      console.log(res);
    });
    modal.present();
  }
}
