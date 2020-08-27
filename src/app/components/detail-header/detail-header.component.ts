import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
})
export class DetailHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() isModal = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
