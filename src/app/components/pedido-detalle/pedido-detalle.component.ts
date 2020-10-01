import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss'],
})
export class PedidoDetalleComponent implements OnInit {

  @Input() idOrden: number;
  constructor(private requestServ: RequestService) { }

  ngOnInit() {
    console.log("IDORDEN",this.idOrden);
  }

}
