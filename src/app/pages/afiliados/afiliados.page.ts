import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { NavController } from '@ionic/angular';

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
              private requestServ: RequestService) { }

  ngOnInit() {
    this.idCategoria = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAfiliados();
  }

  async getAfiliados() {
    const response = await this.requestServ.getAfiliadosByCategoria(this.idCategoria);
    if (response[0]) {
      this.afiliados = response[1];
      console.log(this.afiliados);
    }
  }

  buscar(e: any) {

  }
}
