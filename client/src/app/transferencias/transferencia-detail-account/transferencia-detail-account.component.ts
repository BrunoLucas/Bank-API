import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';
import {DatePipe} from '@angular/common';
import {AccountService} from '../../account/account.service';
import {Account} from '../../account/account';
@Component({
  selector: 'app-transferencia-detail-account',
  templateUrl: './transferencia-detail-account.component.html',
  styleUrls: ['./transferencia-detail-account.component.scss']
})
export class TransferenciaDetailAccountComponent implements OnInit, OnDestroy {

  selectedTransferencia: Transferencia;
  account: Account;
  private transferenciaIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountService: AccountService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
        const accountMemory: any = {};
        accountMemory.numero = localStorage.getItem('account');
        accountMemory.agencia = localStorage.getItem('agency');
        this.accountService.obterDadosDeConta(accountMemory)
        .subscribe(data => {
            this.account = new Account();
            this.account.numero = data.numero;
            this.account.agencia = data.agencia;
            this.account.data_criacao = new DatePipe('pt-BR').transform(data.data_criacao, 'dd/MM/yyyy');
            this.account.saldo = data.saldo;
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

