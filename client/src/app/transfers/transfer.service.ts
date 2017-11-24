import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Transfer } from './transfer';

@Injectable()
export class TransferService {

  transfersChanged = new EventEmitter<Observable<Transfer[]>>();

  private url = 'app/transferencias';

  public constructor(private _http: Http) { }

    obterHistoricoDeConta(number, agency) {
      return this._http.get(`http://localhost:5000/api/v1/account/${number}/agency/${agency}/historic`)
                  .map((res: Response) => res.json());
    }

  getAll(): Observable<Transfer[]> {
    return this._http.get(this.url)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  get(id) {
    return this._http.get(`http://localhost:5000/api/v1/account/transfer/${id}`)
                .map((res: Response) => res.json());
  }

  add(record) {
    return this._http.post(`http://localhost:5000/api/v1/account/transfer`, JSON.stringify(record),
        {headers: this.getHeaders()})
      .map(res => res.json().data)
      .do(data => this.transfersChanged.emit(this.getAll()))
      .catch(this.handleError);
  }

  update(record) {
    return this._http.put(this.getUrl(record.id), JSON.stringify(record), {headers: this.getHeaders()})
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  remove(id) {
    return this._http.delete(this.getUrl(id), {headers: this.getHeaders()})
      .map(res => res.json())
      .do(data => this.transfersChanged.emit(this.getAll()))
      .catch(this.handleError);
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    const erro = error.message || 'Server error';
    console.error('Ocorreu um erro', error);
    return Observable.throw(erro);
  }

  private getUrl(id) {
    return `${this.url}/${id}`;
  }
}
