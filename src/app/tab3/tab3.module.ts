import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { NgChartsModule } from 'ng2-charts';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { SearchEventComponent } from './search-event/search-event.component';
import { ComponentModule } from '../component/component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
    Tab3PageRoutingModule,
    ComponentModule
  ],
  declarations: [Tab3Page, CategoryChartComponent, SearchEventComponent]
})
export class Tab3PageModule {}
