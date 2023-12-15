import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CategoryComponent } from './category/category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { ComponentModule } from '../component/component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ComponentModule,
  ],
  declarations: [
    Tab1Page, 
    CategoryComponent, 
    DetailCategoryComponent
  ],
})
export class Tab1PageModule {}
