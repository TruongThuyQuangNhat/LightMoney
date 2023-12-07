import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-select-time',
  templateUrl: './modal-select-time.component.html',
  styleUrls: ['./modal-select-time.component.scss'],
})
export class ModalSelectTimeComponent  implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  cancel(){
    this.modalCtrl.dismiss();
  }
}
