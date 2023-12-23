import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { Tab4Component } from './tab4.component';
import { ComponentModule } from '../component/component.module';
import { PageAddComponent } from './page-add/page-add.component';
import { PageAddHistoryComponent } from './page-add-history/page-add-history.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
    Tab4PageRoutingModule,
    ComponentModule,
    Tab4PageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [Tab4Component, PageAddComponent, PageAddHistoryComponent]
})
export class Tab4PageModule {}
