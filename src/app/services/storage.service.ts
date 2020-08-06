import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  guardarTutorial() {
    this.storage.set('tutorial', true);
  }

  cargarTutorial() {
    return this.storage.get('tutorial');
  }
}
