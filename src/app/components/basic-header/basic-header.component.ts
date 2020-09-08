import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-basic-header',
  templateUrl: './basic-header.component.html',
  styleUrls: ['./basic-header.component.scss'],
})
export class BasicHeaderComponent implements OnInit {

  constructor(public storageServ: StorageService,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {}

  goUbicacion() {
    this.router.navigateByUrl('/ubicacion');
  }

  async goMenu() {
    let modal: any;
    if (this.storageServ.usuario) {
      modal = await this.modalCtrl.create({
        component: MenuComponent,
        cssClass: 'modal-fullscreen'
      });
    } else {
      modal = await this.modalCtrl.create({
        component: LoginComponent,
        cssClass: 'modal-fullscreen'
      });
    }

    modal.present();
  }
}
