import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss'],
})
export class CartFooterComponent implements OnInit {

  constructor(public storageServ: StorageService) { }

  ngOnInit() {}

}
