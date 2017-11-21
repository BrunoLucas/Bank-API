import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';

import { TransferenciaService } from '../transferencia.service';
import { Transferencia } from '../transferencia';
import { BasicValidators } from '../../shared/basic-validators';
import { ComponentCanDeactivate } from './transferencia-form.guard';

@Component({
  selector: 'app-transferencia-form',
  templateUrl: './transferencia-form.component.html',
  styleUrls: ['./transferencia-form.component.scss']
})
export class TransferenciaFormComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  form: FormGroup;
  private transferenciaIndex: number;
  private title: string;
  private isNew: boolean = true;
  private transferencia: Transferencia;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private transferenciasService: TransferenciaService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.transferenciaIndex = +params['id'];
          this.transferenciasService.get(this.transferenciaIndex)
          .subscribe(data => this.transferencia = data);
          this.title = 'Edit transferencia';
        } else {
          this.isNew = true;
          this.transferencia = new Transferencia();
          this.title = 'New transferencia';
        }
        this.initForm();
      }
    );
  }

  private initForm() {
    this.form = this.formBuilder.group({
      numero: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      agencia: ['', [
        Validators.required]],
        numero_destino: ['', [
          Validators.required,
          Validators.minLength(3)
        ]],
        agencia_destino: ['', [
          Validators.required]]   ,
          valor: ['', [
            Validators.required]]
    });
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['/transferencias']);
  }

  onSave() {
    const transferenciaValue = this.form.value;
    let result;

      result = this.transferenciasService.add(transferenciaValue);


    this.form.reset();

    result.subscribe(data => this.navigateBack(),
    err => {
      alert("An error occurred." + err);
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