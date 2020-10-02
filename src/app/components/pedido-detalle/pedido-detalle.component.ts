import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss'],
})
export class PedidoDetalleComponent implements OnInit {

  @Input() idOrden: number;
  submenu = 1;
  orden: any;
  constructor(private requestServ: RequestService) { }

  ngOnInit() {
    this.getOrdenById();
  }

  async getOrdenById() {
    const response = await this.requestServ.getOrdenByID(this.idOrden);
    if (response[0]) {
      this.orden = response[1];
    }
  }

  changeSubmenu(option: number) {
    this.submenu = option;
  }
}
