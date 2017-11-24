import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { TransfersInMemoryDS } from './transfers-in-memory-ds';

import { TransferComponent } from './transfer.component';
import { TransferStartComponent } from './transfer-start.component';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransferDetailComponent } from './transfer-detail/transfer-detail.component';
import { transfersRouting } from './transfer.routing';
import { TransferService } from './transfer.service';
import { TransferListItemComponent } from './transfer-list-item/transfer-list-item.component';
import { TransferFormGuard } from './transfer-form/transfer-form.guard';
import { TransferDetailAccountComponent } from './transfer-detail-account/transfer-detail-account.component'; 

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      HttpModule,
      InMemoryWebApiModule.forRoot(TransfersInMemoryDS, { delay: 600 }),
      transfersRouting
    ],
    declarations: [
      TransferComponent,
      TransferStartComponent,
      TransferListComponent,
      TransferFormComponent,
      TransferDetailComponent,
      TransferListItemComponent,
      TransferDetailAccountComponent
    ],
    providers: [ TransferFormGuard ]
})
export class TransferModule {}
