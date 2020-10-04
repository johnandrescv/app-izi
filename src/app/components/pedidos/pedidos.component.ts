import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ControllersService } from '../../services/controllers.service';
import { ModalController } from '@ionic/angular';
import { PedidoDetalleComponent } from '../pedido-detalle/pedido-detalle.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  ordenes = [];
  estados = {
    FCS: {texto: 'Confirmando Orden', color: 'warning'},
    OPBR: {texto: 'Buscando repartidor', color: 'warning'},
    OPRC: {texto: 'Repartidor en camino', color: 'primary'},
    OPRL: {texto: 'Repartidor Listo', color: 'primary'},
    OLBR: {texto: 'Buscando repartidor', color: 'primary'},
    OLRC: {texto: 'Repartidor en camino', color: 'primary'},
    C: {texto: 'Orden cancelada', color: 'danger'},
    E: {texto: 'Orden eliminadada', color: 'danger'},
    T: {texto: 'Orden Terminada', color: 'success'},
  }
  loading = false;
  constructor(private requestServ: RequestService,
              private modalCtrl: ModalController,
              private controllserServ: ControllersService) { }

  ngOnInit() {
    this.getOrdenesActivas();
  }

  async getOrdenesActivas() {
    this.loading = true;
    await this.controllserServ.showLoading('Cargando...');
    const response = await this.requestServ.getOrdenesActivas();
    if (response[0]) {
      this.ordenes = response[1].ordenes;
      this.controllserServ.loading.dismiss();
      this.loading = false;
    }
  }

  async goOrden(id: number) {
    const modal = await this.modalCtrl.create({
      component: PedidoDetalleComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        idOrden: id,
      }
    });

    modal.present();
  }

  doRefresh(event) {
    this.ordenes = [];
    this.getOrdenesActivas();
    event.target.complete();
  }
}
