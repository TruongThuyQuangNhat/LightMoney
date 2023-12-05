import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideItemComponent } from './slide-item/slide-item.component';
import { ItemEventComponent } from './item-event/item-event.component';
import { IonicModule } from '@ionic/angular';

const COMPONENT = [
  SlideItemComponent,
  ItemEventComponent
];

@NgModule({
  declarations: [
    COMPONENT
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    COMPONENT
  ]
})
export class ComponentModule { }
