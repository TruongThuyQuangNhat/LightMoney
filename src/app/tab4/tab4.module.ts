import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { Tab4Component } from './tab4.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
    Tab4PageRoutingModule
  ],
  declarations: [Tab4Component]
})
export class Tab4PageModule {}
