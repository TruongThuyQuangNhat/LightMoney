import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-event',
  templateUrl: './item-event.component.html',
  styleUrls: ['./item-event.component.scss'],
})
export class ItemEventComponent  implements OnInit {
  @Input() item: any;
  @Input() currency = "VND";
  constructor() { }

  ngOnInit() {}
}
