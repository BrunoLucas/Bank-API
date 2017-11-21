import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';

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
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        console.log('Params ' +  params);
        this.transferenciaIndex = params['id'];
        this.transferenciasService.get(this.transferenciaIndex)
        .subscribe(data => this.selectedTransferencia = data);
      }
    );
  }

  onEdit() {
    this.router.navigate(['/transferencias', this.transferenciaIndex, 'edit']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(){
    if (confirm("Are you sure you want to delete " + this.selectedTransferencia.name + "?")) {
      this.transferenciasService.remove(this.selectedTransferencia.id)
        .subscribe(
          data => this.router.navigate(['/transferencias']),
          err => {
            alert("Contato não removido.");
          });
    }
  }
}
