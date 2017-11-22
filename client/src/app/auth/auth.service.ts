import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Conta } from './user.interface';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { error } from 'selenium-webdriver';

@Injectable()
export class AuthService {

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;

  private conta: Conta;
  constructor(private router: Router, private _http: Http) {}


   signIn(conta: Conta) {
     const info = {
        conta: conta.numero,
        agencia: conta.agencia
     };

    return this._http.post(`http://localhost:5000/api/v1/login`, info)
                .map((res: Response) => res.json())
                 .subscribe(contaRetornada => {
                        this.authenticated = true;
                        this.showNavBar(true);
                        this.router.navigate(['/']);
                        localStorage.setItem('account', contaRetornada.numero);
                        localStorage.setItem('agency', contaRetornada.agencia);
                }, error => {
                    console.log('Erro ao tentar obter dados de conta ' + error);
                    this.authenticated = false;
                });
  }

  logout() {
    this.authenticated = false;
    this.showNavBar(false);
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  private showNavBar(ifShow: boolean) {
     this.showNavBarEmitter.emit(ifShow);
  }
}
