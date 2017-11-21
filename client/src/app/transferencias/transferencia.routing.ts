import { Routes, RouterModule } from '@angular/router';

import { TransferenciaComponent } from './transferencia.component';
import { TransferenciaStartComponent } from './transferencia-start.component';
import { TransferenciaFormComponent } from './transferencia-form/transferencia-form.component';
import { TransferenciaDetailComponent } from './transferencia-detail/transferencia-detail.component';
import { TransferenciaFormGuard } from './transferencia-form/transferencia-form.guard';

const transferenciaS_ROUTES: Routes = [
  { path: '', component: TransferenciaComponent, children: [
      { path: '', component: TransferenciaStartComponent },
      { path: 'new', component: TransferenciaFormComponent ,
        canDeactivate: [TransferenciaFormGuard]},
      { path: ':id', component: TransferenciaDetailComponent },
      { path: ':id/edit', component: TransferenciaFormComponent,
        canDeactivate: [TransferenciaFormGuard]}
  ]}
];

export const transferenciasRouting = RouterModule.forChild(transferenciaS_ROUTES);
