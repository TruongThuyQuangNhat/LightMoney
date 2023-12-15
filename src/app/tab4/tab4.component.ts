import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component  implements OnInit {
  typeHeader: string = 'loan';
  typeContent: string = 'list';
  constructor() { }

  ngOnInit() {}

  changeSegment(ev: any) {
    this.typeContent = ev.detail.value;
  }

  changeSegmentHeader(ev: any) {
    this.typeHeader = ev.detail.value;
  }
}
