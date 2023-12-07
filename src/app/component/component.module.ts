import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideItemComponent } from './slide-item/slide-item.component';
import { ItemEventComponent } from './item-event/item-event.component';
import { IonicModule } from '@ionic/angular';
import { ModalSelectTimeComponent } from './modal-select-time/modal-select-time.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';

const COMPONENT = [
  SlideItemComponent,
  ItemEventComponent,
  ModalSelectTimeComponent,
  ModalCategoryComponent
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
