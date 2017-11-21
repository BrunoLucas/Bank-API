import { Component, OnInit } from '@angular/core';

import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-transferencia-list',
  templateUrl: './transferencia-list.component.html',
  styleUrls: ['./transferencia-list.component.scss']
})
export class TransferenciaListComponent implements OnInit {

  transferencias: Transferencia[] = [];

  constructor(private transferenciasService: TransferenciaService, private authService: AuthService) { }

  ngOnInit() {
    console.log('ngOnInit');
    let conta: any = localStorage.getItem('account');
    let agencia: any = localStorage.getItem('agency');
     this.authService.obterHistoricoDeConta(conta, agencia).subscribe(movimentos=>{ 
        console.log('retorno do service ' + movimentos); 
              if(movimentos){
                    this.transferencias = [];
                    movimentos.forEach(movimento=>{
                        let transferencia = new Transferencia();            
                        transferencia.numero = movimento.numero_conta_remetente;
                        transferencia.agencia = movimento.agencia_remetente;
                        transferencia.conta_destino = movimento.numero_conta_destinatario;
                        transferencia.agencia_destino = movimento.agencia_destinatario;
                        transferencia.valor = movimento.valor_movimentacao;
                        transferencia.data =  '01/01/1200';
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
