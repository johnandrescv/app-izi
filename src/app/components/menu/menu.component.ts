import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public storageServ: StorageService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.storageServ.usuario);
  }

  cerrarSesion() {
    this.storageServ.cerrarSesion();
    this.modalCtrl.dismiss();
  }
}
