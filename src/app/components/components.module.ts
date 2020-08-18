import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { CartFooterComponent } from './cart-footer/cart-footer.component';



@NgModule({
  declarations: [BasicHeaderComponent, DetailHeaderComponent, CartFooterComponent],
  exports: [
    BasicHeaderComponent,
    DetailHeaderComponent,
    CartFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
