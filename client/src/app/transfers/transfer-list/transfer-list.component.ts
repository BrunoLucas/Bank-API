import { Component, OnInit } from '@angular/core';
import { TransferService } from '../transfer.service';
import { Transfer } from '../transfer';
import { AuthService } from '../../auth/auth.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnInit {

  transfers: Transfer[] = [];

  constructor(private transfersService: TransferService, private authService: AuthService) { }

  ngOnInit() {
    const conta: any = localStorage.getItem('account');
    const agencia: any = localStorage.getItem('agency');
     this.transfersService.obterHistoricoDeConta(conta, agencia).subscribe(movimentos => {
              if (movimentos) {
                        this.transfers = [];
                        movimentos.forEach(movimento => {
                              const transfer = new Transfer();
                              transfer.number = movimento.sender_account_number;
                              transfer.agency = movimento.sender_agency;
                              transfer.recipient_account = movimento.recipient_account_number;
                              transfer.recipient_agency = movimento.recipient_agency;
                              transfer.amount = movimento.amount;
                              transfer.date = new DatePipe('pt-BR').transform(movimento.date_movement, 'dd/MM/yyyy');
                              transfer._id = movimento._id;
                              this.transfers.push(transfer);
                        });
            }
        }
     );

    this.transfersService.transfersChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => {
          console.log('data ' + data);
          this.transfers = data;
        }
      )
    );
  }


}
