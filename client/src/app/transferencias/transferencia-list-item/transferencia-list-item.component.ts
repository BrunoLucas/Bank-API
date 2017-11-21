import { Component, OnInit, Input } from '@angular/core';

import { Transferencia } from '../transferencia';

@Component({
  selector: 'app-transferencia-list-item',
  templateUrl: './transferencia-list-item.component.html',
  styleUrls: ['./transferencia-list-item.component.scss']
})
export class TransferenciaListItemComponent implements OnInit {

  @Input() transferencia: Transferencia;

  constructor() { }

  ngOnInit() {
  }

}
