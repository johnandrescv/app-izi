import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-productos-detalle',
  templateUrl: './productos-detalle.page.html',
  styleUrls: ['./productos-detalle.page.scss'],
})
export class ProductosDetallePage implements OnInit {

  productoId: any;
  producto: any;
  sucursalName = '';
  afiliado: any;
  extrasSeleccion = [];
  constructor(private activatedRoute: ActivatedRoute,
              private storageServ: StorageService,
              private requestServ: RequestService) { }

  ngOnInit() {
    this.productoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
  }


  async getData() {
    const response = await this.requestServ.getProductosDetailById(this.productoId);
    if (response[0]) {
      this.sucursalName = response[1].afiliado.nombres;
      this.afiliado = response[1].afiliado;
      this.producto = response[1].producto;
    }
  }

  manageExtra(extra: any) {
    const flag = this.extrasSeleccion.findIndex(data => data.id_producto_extra === extra.id_producto_extra);
    if (flag >= 0) {
      this.extrasSeleccion.splice(flag, 1);
    } else {
      this.extrasSeleccion.push(extra);
    }
    console.log("Extras", this.extrasSeleccion);
  }
}
