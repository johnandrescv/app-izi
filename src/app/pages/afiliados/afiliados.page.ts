import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.page.html',
  styleUrls: ['./afiliados.page.scss'],
})
export class AfiliadosPage implements OnInit {

  idCategoria: any;
  afiliados = [];
  constructor(private activatedRoute: ActivatedRoute,
              public navCtrl: NavController,
              private requestServ: RequestService,
              private storageServ: StorageService) { }

  ngOnInit() {
    this.idCategoria = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAfiliados();
  }

  async getAfiliados() {
    const response = await this.requestServ.getAfiliadosByCategoria(this.idCategoria);
    if (response[0]) {
      this.afiliados = response[1];
    }
  }

  buscar(e: any) {

  }

  goProductos(afiliado: any) {
    this.storageServ.afiliado = afiliado;
    this.navCtrl.navigateForward(['/productos', afiliado.id_afiliado_sucursal]);
  }
}
