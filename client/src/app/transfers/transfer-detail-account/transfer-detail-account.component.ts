import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { TransferService } from '../transfer.service';
import { DatePipe } from '@angular/common';
import { AccountService } from '../../account/account.service';
import { Account } from '../../account/account';
@Component({
  selector: 'app-transfer-detail-account',
  templateUrl: './transfer-detail-account.component.html',
  styleUrls: ['./transfer-detail-account.component.scss']
})
export class TransferDetailAccountComponent implements OnInit, OnDestroy {

  account: Account;
  private transferIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private transferService: TransferService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
      this.getAccountDetails();
    }
    );

    this.transferService.transfersChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => {
          this.getAccountDetails();
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAccountDetails() {
    const accountMemory: any = {};
    accountMemory.number = localStorage.getItem('account');
    accountMemory.agency = localStorage.getItem('agency');
    this.accountService.obterDadosDeConta(accountMemory)
      .subscribe(data => {
        console.log(data);
        this.account = new Account();
        this.account.number = data.number;
        this.account.agency = data.agency;
        this.account.creation_date = new DatePipe('pt-BR').transform(data.creation_date, 'dd/MM/yyyy');
        this.account.amount = data.opening_balance;
        this.account.name = data.name;
      });
  }


}

