import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  ubicacion: any;
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
}
