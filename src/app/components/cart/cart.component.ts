import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  items = [];
  body = [];
  constructor(public storageServ: StorageService) { }

  ngOnInit() {
    this.checkCarrito();
  }

  checkCarrito() {
    for(const item of this.storageServ.carrito) {
      let total = 0;
      if (item.info.is_plato === "1"){
        const plato = this.normalizePlato(item);
        this.body.push(plato);
        
        for (const extra of item.extras) {
          total = total + extra.precio;
        }
  
        for (const preferencia of item.preferencias) {
          total = total + preferencia.seleccion.precio;
        }
      } else {
        this.body.push({id_producto: item.info.id_producto, cantidad: item.cantidad,});
      }
      let subtotal = item.info.precio;
      if (item.info.descuento.valor === 0) {
        if(item.info.descuento.is_porcentaje == '0') {
          subtotal = item.info.precio - item.info.descuento.valor 
        }else{
          subtotal = item.info.precio - (item.info.precio * (item.info.descuento.valor / 100))
        }
      }
      total = total + subtotal;
      this.items.push({...item, total});
    }

    console.log(this.items);
  }

  normalizePlato(item: any) {
    const extras = item.extras.map((extra: any) => extra.id_producto_extra);
    const preferencias = item.preferencias.map((preferencia: any) => preferencia.id_producto_preferencia);
    const plato = {
      id_producto: item.info.id_afiliado_producto,
      extras: extras,
      preferencias: preferencias,
      cantidad: item.cantidad,
      detalles: item.notas
    }
    return plato;
  }

}
