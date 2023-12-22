import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-slide-item',
  templateUrl: './slide-item.component.html',
  styleUrls: ['./slide-item.component.scss'],
})
export class SlideItemComponent  implements OnInit {
  @Input() item: any;
  currency = "VND";

  @Output() eventDetail = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  action(type: string, slidingItem?: IonItemSliding){
    if(slidingItem){
      slidingItem.close();
    }
    this.eventDetail.emit(type);
  }
}
