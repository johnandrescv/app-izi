import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ModalController } from '@ionic/angular';
import { PedidosComponent } from 'src/app/components/pedidos/pedidos.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categorias = [];
  constructor(private requestServ: RequestService,
              public storageServ: StorageService,
              private modalCtrl: ModalController) { }
  
  ngOnInit() {
    this.getCategorias();
  }

  ionViewWillEnter() {
    if (this.storageServ.usuario) {
      this.getOrdenesActivas();
    }
  }

  async getCategorias() {
    const response = await this.requestServ.getCategorias();
    if (response[0]) {
      this.categorias = response[1];
      if (this.storageServ.usuario) {
        this.getOrdenesActivas();
      }
    }
  }

  async goOrdenesActiva() {
    const modal = await this.modalCtrl.create({
      component: PedidosComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        url: 'ordenes/activas'
      }
    });

    modal.present();
  }

  buscar(e: any) {

  }

  async getOrdenesActivas() {
    const response = await this.requestServ.getOrdenes('ordenes/activas');
    if (response[0]) {
      this.storageServ.ordenes = response[1].cantidad;
    }
  }
}
