import { Component, OnInit, Input } from '@angular/core';

import { Transfer } from '../transfer';

@Component({
  selector: 'app-transfer-list-item',
  templateUrl: './transfer-list-item.component.html',
  styleUrls: ['./transfer-list-item.component.scss']
})
export class TransferListItemComponent implements OnInit {

  @Input() transfer: Transfer;

  constructor() { }

  ngOnInit() {
  }

}
