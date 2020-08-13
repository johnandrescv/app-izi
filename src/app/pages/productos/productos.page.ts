import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  sucursalId: any;
  sucursalName: any;
  data = [];
  constructor(private activatedRoute: ActivatedRoute,
              private requestServ: RequestService) { }

  ngOnInit() {
    this.sucursalId = this.activatedRoute.snapshot.paramMap.get('id');
    this.sucursalName = this.activatedRoute.snapshot.paramMap.get('name');
    this.getData();
  }

  async getData() {
    const response = await this.requestServ.getProductosBySucursal(this.sucursalId);
    if (response[0]) {
      this.data = response[1].categorias;
      this.segment.value = this.data[0].id_afiliado_categoria;
    }
  }

  cambioCategoria(event) {
    this.segment.value = event.detail.value;
  }
}
