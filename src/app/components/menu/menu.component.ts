import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ModalController } from '@ionic/angular';
import { DatosFacturacionComponent } from '../datos-facturacion/datos-facturacion.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public storageServ: StorageService,
              private modalCtrl: ModalController) { }

  ngOnInit() {}

  async datosFacturacion() {
    const modal = await this.modalCtrl.create({
      component: DatosFacturacionComponent,
      componentProps: {
        color: 'primary',
      }
    });
    modal.present();
  }

  cerrarSesion() {
    this.storageServ.cerrarSesion();
    this.modalCtrl.dismiss();
  }
}
