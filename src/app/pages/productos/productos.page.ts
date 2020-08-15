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
  productos = [];
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
    this.subcategorias = [];
    this.productos = [];
    this.segment.value = event.detail.value;
    const localCategoria = this.categorias.find((data) => data.id_afiliado_categoria === Number(event.detail.value));
    if (localCategoria.subcategorias) {
      this.subcategorias = localCategoria.subcategorias;
      this.subcategoriaSeleccion = this.subcategorias[0].id_subcategoria;
      this.productos = this.subcategorias[0].productos;
    } else {
      this.productos = localCategoria.productos;
    }
  }

  cambioSubcategoria(event) {
    this.productos = [];
    this.subcategoriaSeleccion = event.detail.value;
    this.productos = this.subcategorias.find((data) => data.id_subcategoria === Number(event.detail.value)).productos;
  }
}
