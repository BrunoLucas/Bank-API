import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Account } from '../account/account';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { error } from 'selenium-webdriver';

@Injectable()
export class AccountService {

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private _http: Http) {}

   obterDadosDeConta(account: Account) {
    return this._http.get(`http://localhost:5000/api/v1/conta/${account.numero}/agencia/${account.agencia}`)
                .map((res: Response) => res.json());
  }

}
