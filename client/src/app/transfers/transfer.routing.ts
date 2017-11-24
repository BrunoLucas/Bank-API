import { Routes, RouterModule } from '@angular/router';

import { TransferComponent } from './transfer.component';
import { TransferStartComponent } from './transfer-start.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransferDetailComponent } from './transfer-detail/transfer-detail.component';
import { TransferFormGuard } from './transfer-form/transfer-form.guard';

const transfers_ROUTES: Routes = [
  { path: '', component: TransferComponent, children: [
      { path: '', component: TransferStartComponent },
      { path: 'new', component: TransferFormComponent ,
        canDeactivate: [TransferFormGuard]},
      { path: ':id', component: TransferDetailComponent },
      { path: ':id/edit', component: TransferFormComponent,
        canDeactivate: [TransferFormGuard]}
  ]}
];

export const transfersRouting = RouterModule.forChild(transfers_ROUTES);
