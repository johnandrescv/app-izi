import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-header',
  templateUrl: './basic-header.component.html',
  styleUrls: ['./basic-header.component.scss'],
})
export class BasicHeaderComponent implements OnInit {

  constructor(public storageServ: StorageService,
              private router: Router) { }

  ngOnInit() {}

  goUbicacion() {
    this.router.navigateByUrl('/ubicacion');
  }
}
