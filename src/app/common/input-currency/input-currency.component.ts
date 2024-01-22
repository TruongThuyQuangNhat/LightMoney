import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
})
export class InputCurrencyComponent  implements OnInit {
  @Input() value: any = 0;
  @Input() label: string = "";

  @Output() valueChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  focusInputExp() {
    if(this.value === 0){
      this.value = null;
      this.valueChange.emit(0);
    }
  }

  blurInputExp() {
    if(!this.value){
      this.value = 0;
      this.valueChange.emit(this.value);
    }
  }

  changeInputExp(event?: any) {
    if(event?.detail.value){
      let temp: string = event.detail.value?.replaceAll(".", "");
      this.value = this.recursiveCurrency(temp);
      console.log(this.value);
    } else {
      let temp: string = this.value?.toString()?.replaceAll(".", "");
      this.value = this.recursiveCurrency(temp);
    }
  }

  recursiveCurrency(value: string): string{
   if(value.length > 3){
    return this.recursiveCurrency(value.slice(0, value.length - 3)) + "." + value.slice(value.length - 3);
   } else {
     return value;
   }
  }
}
