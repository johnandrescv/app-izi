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
import { PedidosComponent } from './pedidos/pedidos.component';
import { NoDataComponent } from './no-data/no-data.component';

import { MomentModule } from 'ngx-moment';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { PedidoResumenComponent } from './pedido-resumen/pedido-resumen.component';
import { AutosizeModule } from 'ngx-autosize';
import { ChatComponent } from './chat/chat.component';
import { PedidoUbicacionComponent } from './pedido-ubicacion/pedido-ubicacion.component';

@NgModule({
  declarations: [BasicHeaderComponent, DetailHeaderComponent, CartFooterComponent, AfiliadoDetailComponent, LoginComponent, CartComponent, MenuComponent, DatosFacturacionComponent, PedidosComponent, NoDataComponent, PedidoDetalleComponent, PedidoResumenComponent, ChatComponent, PedidoUbicacionComponent],
  exports: [
    BasicHeaderComponent,
    DetailHeaderComponent,
    CartFooterComponent,
    AfiliadoDetailComponent,
    LoginComponent,
    CartComponent,
    MenuComponent,
    PedidosComponent,
    DatosFacturacionComponent,
    NoDataComponent,
    PedidoDetalleComponent,
    PedidoResumenComponent,
    ChatComponent,
    PedidoUbicacionComponent
  ],
  imports: [
    MomentModule,
    AutosizeModule,
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
