import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestService } from '../../services/request.service';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuario = {
    correo: '',
    contrasena: ''
  }
  constructor(public modalCtrl: ModalController,
              private requestServ: RequestService,) { }

  ngOnInit() {}

  async login() {
    const body = JSON.stringify(this.usuario);
    const response = await this.requestServ.login(body);
    if (response) {
      this.modalCtrl.dismiss();
    }
  }

  async goRegistro() {
    const modal = await this.modalCtrl.create({
      component: RegistroComponent,
      cssClass: 'modal-fullscreen'
    });

    modal.present();
  }
}
