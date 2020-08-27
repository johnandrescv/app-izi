import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ControllersService } from '../../services/controllers.service';
import { LoginComponent } from '../login/login.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss'],
})
export class CartFooterComponent implements OnInit {

  constructor(public storageServ: StorageService,
              private modalCtrl: ModalController,
              private controlServ: ControllersService) { }

  ngOnInit() {}

  async goCarrito() {
    if (this.storageServ.getItemsCarrito() === 0) {
      this.controlServ.showToast('Usted no ha seleccionado ningún producto', 3000, 'top', 'warning');
      return;
    }

    if (!this.storageServ.usuario) {
      const modal = await this.modalCtrl.create({
        component: LoginComponent,
        cssClass: 'modal-fullscreen'
      });
      modal.present();
    }
  }
}
