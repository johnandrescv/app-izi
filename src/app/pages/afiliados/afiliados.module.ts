import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfiliadosPageRoutingModule } from './afiliados-routing.module';

import { AfiliadosPage } from './afiliados.page';
import { ComponentsModule } from '../../components/components.module';
import { MenuComponent } from '../../components/menu/menu.component';

@NgModule({
  entryComponents: [MenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AfiliadosPageRoutingModule
  ],
  declarations: [AfiliadosPage]
})
export class AfiliadosPageModule {}
