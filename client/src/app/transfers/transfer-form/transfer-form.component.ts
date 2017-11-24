import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';
import { TransferService } from '../transfer.service';
import { Transfer } from '../transfer';
import { BasicValidators } from '../../shared/basic-validators';
import { ComponentCanDeactivate } from './transfer-form.guard';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  form: FormGroup;
  private transferIndex: number;
  private title: string;
  private isNew: boolean = true;
  private transfer: Transfer;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private transfersService: TransferService) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.transferIndex = +params['id'];
          this.transfersService.get(this.transferIndex)
            .subscribe(data => this.transfer = data);
          this.title = 'Edit transfer';
        } else {
          this.isNew = true;
          this.transfer = new Transfer();
          this.transfer.number  = localStorage.getItem('account');
          this.transfer.agency = localStorage.getItem('agency');
          this.title = 'New transfer';
        }
        this.initForm();
      }
    );
    console.log('pegando conta da sessao');
    this.transfer.number  = localStorage.getItem('account');
    this.transfer.agency = localStorage.getItem('agency');
  }

  private initForm() {
    this.form = this.formBuilder.group({
      sender_account_number: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      sender_agency: ['', [
        Validators.required]],
      recipient_account_number: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      recipient_agency: ['', [
        Validators.required]],
      amount: ['', [
        Validators.required]]
    });
}

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['/transfers']);
  }

  onSave() {
    const transferValue = this.form.value;
    let result;

    result = this.transfersService.add(transferValue);


    this.form.reset();

    result.subscribe(data => this.navigateBack(),
      err => {
        alert('An error occurred.' + err);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('Do you want to leave this page?');
    }
    return true;
  }
}
