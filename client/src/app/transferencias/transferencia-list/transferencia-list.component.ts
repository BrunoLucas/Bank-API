import { Component, OnInit } from '@angular/core';

import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';
import { AuthService } from '../../auth/auth.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-transferencia-list',
  templateUrl: './transferencia-list.component.html',
  styleUrls: ['./transferencia-list.component.scss']
})
export class TransferenciaListComponent implements OnInit {

  transferencias: Transferencia[] = [];

  constructor(private transferenciasService: TransferenciaService, private authService: AuthService) { }

  ngOnInit() {
    const conta: any = localStorage.getItem('account');
    const agencia: any = localStorage.getItem('agency');
     this.transferenciasService.obterHistoricoDeConta(conta, agencia).subscribe(movimentos => {
              if (movimentos) {
                        this.transferencias = [];
                        movimentos.forEach(movimento => {
                              const transferencia = new Transferencia();
                              transferencia.numero = movimento.numero_conta_remetente;
                              transferencia.agencia = movimento.agencia_remetente;
                              transferencia.conta_destino = movimento.numero_conta_destinatario;
                              transferencia.agencia_destino = movimento.agencia_destinatario;
                              transferencia.valor = movimento.valor_movimentacao;
                              transferencia.data = new DatePipe('pt-BR').transform(movimento.data_movimentacao, 'dd/MM/yyyy');
                              transferencia.id = movimento._id;
                              this.transferencias.push(transferencia);
                        });
            }
        }
     );

    this.transferenciasService.transferenciasChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.transferencias = data
      )
    );
  }


}
