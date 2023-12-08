import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-yes-no',
  templateUrl: './footer-yes-no.component.html',
  styleUrls: ['./footer-yes-no.component.scss'],
})
export class FooterYesNoComponent  implements OnInit {
  @Output() outAccept: EventEmitter<any> = new EventEmitter();
  @Output() outCancel: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  accept(){
    this.outAccept.emit(true);
  }

  cancel(){
    this.outCancel.emit(true);
  }
}
