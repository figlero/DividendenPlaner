import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {Stock} from '../model/stock';
import {Depot} from '../model/depot';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // stocks
  stocks: Observable<any>;
  stocksRef;
  // depots
  depots: Observable<any>;
  depotsRef;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    // stocks
    this.stocksRef = db.list('stocks');
    this.stocks = db.list('stocks').valueChanges();
    // depots
    this.depotsRef = db.list('depots');
    this.depots = db.list('depots').valueChanges();
  }

  storeStock(stock: Stock) {
    const promise = this.stocksRef.push(stock);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
  }

  storeDepot(depot: Depot) {
    const promise = this.depotsRef.push(depot);
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You do not have access!'));
  }
}
