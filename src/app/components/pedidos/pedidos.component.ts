import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { ControllersService } from '../../services/controllers.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  ordenes = [];
  loading = false;
  constructor(private requestServ: RequestService,
              private controllserServ: ControllersService) { }

  ngOnInit() {
    this.getOrdenesActivas();
  }

  async getOrdenesActivas() {
    this.loading = true;
    await this.controllserServ.showLoading('Creando datos de facturación...');
    const response = await this.requestServ.getOrdenesActivas();
    if (response[0]) {
      this.ordenes = response[1].ordenes;
      this.controllserServ.loading.dismiss();
      this.loading = false;
    }
  }

  doRefresh(event) {
    this.ordenes = [];
    this.getOrdenesActivas();
    event.target.complete();
  }
}
