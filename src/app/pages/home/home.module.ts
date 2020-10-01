import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from '../../components/components.module';
import { MenuComponent } from '../../components/menu/menu.component';
import { DatosFacturacionComponent } from '../../components/datos-facturacion/datos-facturacion.component';
import { PedidosComponent } from 'src/app/components/pedidos/pedidos.component';
import { PedidoDetalleComponent } from '../../components/pedido-detalle/pedido-detalle.component';

@NgModule({
  entryComponents: [MenuComponent, DatosFacturacionComponent, PedidosComponent, PedidoDetalleComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
