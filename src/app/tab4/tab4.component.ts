import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component  implements OnInit {
  type: string = 'loan';
  constructor() { }

  ngOnInit() {}


  changeSegment(ev: any) {
    this.type = ev.detail.value;
  }
}
