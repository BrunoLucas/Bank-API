import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { TransferenciasInMemoryDS } from './transferencias-in-memory-ds';

import { TransferenciaComponent } from './transferencia.component';
import { TransferenciaStartComponent } from './transferencia-start.component';
import { TransferenciaListComponent } from './transferencia-list/transferencia-list.component';
import { TransferenciaFormComponent } from './transferencia-form/transferencia-form.component';
import { TransferenciaDetailComponent } from './transferencia-detail/transferencia-detail.component';
import { transferenciasRouting } from './transferencia.routing';
import { TransferenciaService } from './transferencia.service';
import { TransferenciaListItemComponent } from './transferencia-list-item/transferencia-list-item.component';
import { TransferenciaFormGuard } from './transferencia-form/transferencia-form.guard';
import { TransferenciaDetailAccountComponent } from './transferencia-detail-account/transferencia-detail-account.component'; 

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      HttpModule,
      InMemoryWebApiModule.forRoot(TransferenciasInMemoryDS, { delay: 600 }),
      transferenciasRouting
    ],
    declarations: [
      TransferenciaComponent,
      TransferenciaStartComponent,
      TransferenciaListComponent,
      TransferenciaFormComponent,
      TransferenciaDetailComponent,
      TransferenciaListItemComponent,
      TransferenciaDetailAccountComponent
    ],
    providers: [ TransferenciaFormGuard ]
})
export class TransferenciaModule {}
