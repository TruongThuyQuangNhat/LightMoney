import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideItemComponent } from './slide-item/slide-item.component';
import { ItemEventComponent } from './item-event/item-event.component';
import { IonicModule } from '@ionic/angular';
import { ModalSelectTimeComponent } from './modal-select-time/modal-select-time.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { FooterYesNoComponent } from './footer-yes-no/footer-yes-no.component';
import { CalendarModule } from 'ion7-calendar';
import { NgCalendarModule } from 'ionic2-calendar';
import { FormsModule } from '@angular/forms';
import { EmptyComponent } from './empty/empty.component';
import { InputCurrencyComponent } from '../common/input-currency/input-currency.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

const COMPONENT = [
  SlideItemComponent,
  ItemEventComponent,
  ModalSelectTimeComponent,
  ModalCategoryComponent,
  FooterYesNoComponent,
  EmptyComponent,
  InputCurrencyComponent
];

@NgModule({
  declarations: [
    COMPONENT
  ],
  imports: [
    CommonModule,
    IonicModule,
    CalendarModule,
    NgCalendarModule,
    FormsModule,
    NgZorroAntdMobileModule
  ],
  exports: [
    COMPONENT
  ]
})
export class ComponentModule { }
