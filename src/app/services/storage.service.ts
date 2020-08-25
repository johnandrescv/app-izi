import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  ubicacion: any;
  carrito = [];

  constructor(private storage: Storage) { }

  guardarUbicacion(ubicacion: any) {
    this.ubicacion = ubicacion;
    this.storage.set('ubicacion', ubicacion);
  }

  cargarUbicacion() {
    return this.storage.get('ubicacion');
  }

  removeUbicacion() {
    return this.storage.remove('ubicacion');
  }

  guardarTutorial() {
    this.storage.set('tutorial', true);
  }

  cargarTutorial() {
    return this.storage.get('tutorial');
  }

  guardarProductos(producto: any, action: boolean) {
    const index = this.carrito.findIndex(data => data.info.id_producto === producto.info.id_producto);
    if (index < 0) {
      if (action) {
        this.carrito.push(producto);
      }
    } else {
        if (producto.cantidad === 0) {
          this.carrito.splice(index, 1);
        } else {
          this.carrito[index] = producto;
        }
    }
  }

  getItemsCarrito() {
    let items = 0;
    for (const item of this.carrito) {
      items = items + item.cantidad;
    }
    return items;
  }
}
