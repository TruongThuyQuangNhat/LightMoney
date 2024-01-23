import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
})
export class InputCurrencyComponent  implements OnInit {
  @Input() value: any = 0;
  @Input() valueString: string = "0";
  @Input() label: string = "";

  @Output() valueChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.valueString = this.recursiveCurrency(this.value.toString());
  }

  focusInputExp() {
    if(this.value === 0){
      this.value = null;
      this.valueString = "";
    }
    this.valueChange.emit(this.value);
  }

  blurInputExp() {
    if(!this.value){
      this.value = 0;
      this.valueString = "0";
    }
    this.valueChange.emit(this.value);
  }

  changeInputExp(value?: any) {
    if(value != null){
      let temp: string = value?.replaceAll(".", "");
      this.valueString = this.recursiveCurrency(temp);
      this.value = parseInt(temp);
    } else {
      let temp: string = this.value?.toString()?.replaceAll(".", "");
      this.valueString = this.recursiveCurrency(temp);
      this.value = parseInt(temp);
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
