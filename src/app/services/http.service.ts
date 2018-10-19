import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) {
  }

  getData1Y(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/stock/' + symbol + '/chart/1y');
  }

  getCompanyData(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/stock/' + symbol + '/stats').toPromise();
  }

  getLogo(symbol) {
    return this.http.get('https://api.iextrading.com/1.0/stock/' + symbol + '/logo').toPromise();
  }
}
