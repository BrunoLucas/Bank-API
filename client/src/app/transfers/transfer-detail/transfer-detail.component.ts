import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { TransferService } from '../transfer.service';
import { Transfer } from '../transfer';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-transfer-detail',
  templateUrl: './transfer-detail.component.html',
  styleUrls: ['./transfer-detail.component.scss']
})
export class TransferDetailComponent implements OnInit, OnDestroy {

  selectedTransfer: Transfer;
  private transferIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private transferService: TransferService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
        this.transferIndex = params['id'];
        this.transferService.get(this.transferIndex)
        .subscribe(data => {
            this.selectedTransfer = data;
            this.selectedTransfer.id = data._id;
            this.selectedTransfer.agency = data.sender_agency;
            this.selectedTransfer.recipient_agency = data.recipient_agency;
            this.selectedTransfer.number = data.sender_account_number;
            this.selectedTransfer.recipient_account = data.recipient_account_number;
            this.selectedTransfer.amount = data.amount;
            this.selectedTransfer.date = new DatePipe('pt-BR').transform(data.date_movement, 'dd/MM/yyyy');

        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

