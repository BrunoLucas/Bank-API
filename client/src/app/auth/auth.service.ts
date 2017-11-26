import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Auth } from './auth.interface';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { error } from 'selenium-webdriver';

@Injectable()
export class AuthService {

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;

  constructor(private router: Router, private _http: Http) {}


   signIn(auth: Auth) {
     const info = {
        account: auth.number,
        agency: auth.agency
     };

    return this._http.post(`http://localhost:5000/api/v1/login`, info)
                .map((res: Response) => res.json())
                 .subscribe(accountReturned => {
                        this.authenticated = true;
                        this.showNavBar(true);
                        this.router.navigate(['/']);
                        localStorage.setItem('account', accountReturned.number);
                        localStorage.setItem('agency', accountReturned.agency);
                }, error => {
                    console.log('Erro ao tentar obter dados de conta ' + error);
                    this.authenticated = false;
                    alert(error.statusText);
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

  private handleError(error: any) {
    const erro = error.message || 'Server error';
    console.error('Ocorreu um erro ' +  error.statusText);
    return Observable.throw(error);
  }
}
