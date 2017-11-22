import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-transferencia-detail',
  templateUrl: './transferencia-detail.component.html',
  styleUrls: ['./transferencia-detail.component.scss']
})
export class TransferenciaDetailComponent implements OnInit, OnDestroy {

  selectedTransferencia: Transferencia;
  private transferenciaIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private transferenciasService: TransferenciaService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
        this.transferenciaIndex = params['id'];
        this.transferenciasService.get(this.transferenciaIndex)
        .subscribe(data => {
            this.selectedTransferencia = data;
            this.selectedTransferencia.id = data._id;
            this.selectedTransferencia.agencia = data.agencia_remetente;
            this.selectedTransferencia.agencia_destino = data.agencia_destinatario;
            this.selectedTransferencia.numero = data.numero_conta_remetente;
            this.selectedTransferencia.conta_destino = data.numero_conta_destinatario;
            this.selectedTransferencia.valor = data.valor_movimentacao;
            this.selectedTransferencia.data = new DatePipe('pt-BR').transform(data.data_movimentacao, 'dd/MM/yyyy');

        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

