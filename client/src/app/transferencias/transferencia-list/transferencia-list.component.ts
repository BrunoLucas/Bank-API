import { Component, OnInit } from '@angular/core';

import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';

@Component({
  selector: 'app-transferencia-list',
  templateUrl: './transferencia-list.component.html',
  styleUrls: ['./transferencia-list.component.scss']
})
export class TransferenciaListComponent implements OnInit {

  transferencias: Transferencia[] = [];

  constructor(private transferenciasService: TransferenciaService) { }

  ngOnInit() {
    console.log('ngOnInit');
    let conta: any = localStorage.getItem('account');
    let agencia: any = localStorage.getItem('agency');
    this.transferenciasService.obterHistoricoDeConta(conta, agencia)
    .subscribe(data => this.transferencias = data, err => {
      alert('Aconteceu um erro! ' + err);
    });

    this.transferenciasService.transferenciasChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.transferencias = data
      )
    );
  }

}
