/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransferListComponent } from './transfer-list.component';
import { TransferService } from '../transfer.service';
import { Transfer } from '../transfer';
import { AuthService } from '../../auth/auth.service';
import {DatePipe} from '@angular/common';

describe('Component: TransferListComponent', () => {
  let component, transfer, element, de;
beforeEach(() => {

  TestBed.configureTestingModule({
    imports: [TransferService, AuthService],
    declarations: [ Transfer ]
  });

   component = TestBed.createComponent(TransferListComponent);
   transfer = component.componentInstance;
   element = component.nativeElement;
   de = component.debugElement;

});


  it('should create an instance', () => {
  });
});
