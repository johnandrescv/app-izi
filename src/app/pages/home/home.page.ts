import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ModalController } from '@ionic/angular';
import { PedidosComponent } from 'src/app/components/pedidos/pedidos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categorias = [];
  ordenes = 0;
  constructor(private requestServ: RequestService,
              private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    this.getOrdenesActivas();
  }

  ngOnInit() {
    this.getCategorias();
  }

  async getCategorias() {
    const response = await this.requestServ.getCategorias();
    if (response[0]) {
      this.categorias = response[1];
      this.getOrdenesActivas();
    }
  }

  async getOrdenesActivas() {
    const response = await this.requestServ.getOrdenesActivas();
    if (response[0]) {
      this.ordenes = response[1].cantidad;
    }
  }

  async goOrdenesActiva() {
    const modal = await this.modalCtrl.create({
      component: PedidosComponent,
      cssClass: 'modal-fullscreen'
    });

    modal.present();
  }

  buscar(e: any) {

  }
}
