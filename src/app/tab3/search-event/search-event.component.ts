import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss'],
})
export class SearchEventComponent  implements OnInit {
  events: any[] = [];
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  searchEvent(data: any) {}

  back() {
    this.modalCtrl.dismiss();
  }
}
