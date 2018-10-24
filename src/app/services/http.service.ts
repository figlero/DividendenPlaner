import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Response} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  allSymbols;

  constructor(private http: HttpClient) {
  }

  getData1Y(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1y');
  }

  getKeyStats(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/stock/' + symbol + '/stats').pipe(
      map( value => JSON.parse(JSON.stringify(value)))).toPromise();
  }

  getCompanyData(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/stock/' + symbol + '/company').pipe(
      map( value => JSON.parse(JSON.stringify(value)))).toPromise();
  }

  getLogo(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/stock/' + symbol + '/logo').pipe(
      map( value => JSON.parse(JSON.stringify(value)).url)).toPromise();
  }

  getAllSymbols() {
    return this.http.get('https://api.iextrading.com/1.0/ref-data/symbols').toPromise();
  }

  setAllSymbols(symbols) {
    this.allSymbols = symbols;
  }

  getLastPrice(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/tops/last?symbols=' + symbol).pipe(
      map( value => JSON.parse(JSON.stringify(value))[0])
    );
  }
}
