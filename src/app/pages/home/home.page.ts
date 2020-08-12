import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categorias = [];
  constructor(private requestServ: RequestService) { }

  ngOnInit() {
    this.getCategorias();
  }

  async getCategorias() {
    const response = await this.requestServ.getCategorias();
    if (response[0]) {
      this.categorias = response[1];
    }
  }
}
