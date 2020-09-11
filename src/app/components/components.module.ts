import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { CartFooterComponent } from './cart-footer/cart-footer.component';
import { AfiliadoDetailComponent } from './afiliado-detail/afiliado-detail.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { MenuComponent } from './menu/menu.component';
import { DatosFacturacionComponent } from './datos-facturacion/datos-facturacion.component';



@NgModule({
  declarations: [BasicHeaderComponent, DetailHeaderComponent, CartFooterComponent, AfiliadoDetailComponent, LoginComponent, CartComponent, MenuComponent, DatosFacturacionComponent],
  exports: [
    BasicHeaderComponent,
    DetailHeaderComponent,
    CartFooterComponent,
    AfiliadoDetailComponent,
    LoginComponent,
    CartComponent,
    MenuComponent,
    DatosFacturacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
