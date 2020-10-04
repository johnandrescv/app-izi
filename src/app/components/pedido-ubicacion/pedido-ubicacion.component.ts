import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-pedido-ubicacion',
  templateUrl: './pedido-ubicacion.component.html',
  styleUrls: ['./pedido-ubicacion.component.scss'],
})
export class PedidoUbicacionComponent implements OnInit {

  @Input() orden: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openChat() {
    const modal = await this.modalCtrl.create({
      component: ChatComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        idOrden: this.orden.id_orden,
      }
    });

    modal.present();
  }
}
