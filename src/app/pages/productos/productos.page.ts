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
  categorias = [];
  subcategorias = [];
  subcategoriaSeleccion = 0;
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
      this.categorias = response[1].categorias;
      this.segment.value = this.categorias[0].id_afiliado_categoria;
    }
  }

  cambioCategoria(event) {
    this.segment.value = event.detail.value;
    this.subcategorias = this.categorias.find((data) => data.id_afiliado_categoria === Number(event.detail.value)).subcategorias;
  }

  cambioSubcategoria(event) {
    this.subcategoriaSeleccion = event.detail.value;
  }
}
