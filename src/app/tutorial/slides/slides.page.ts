import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  @ViewChild('tutorial', {static: true}) tutorial;
  isLastTutorial = false;
  constructor(private storageServ: StorageService, private router: Router) { }

  ngOnInit() {
  }

  saveTutorial() {
    this.storageServ.guardarTutorial();
    this.router.navigateByUrl('/ubicacion');
  }

  goNext() {
    this.tutorial.slideNext().then(async () => {
      this.isLastTutorial = await this.tutorial.isEnd();
    });
  }
}
