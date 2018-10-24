import {Stock} from './stock';
import {HttpService} from '../services/http.service';

export class Position {

  stock: Stock;
  anzahl: number;
  buyPrice: number;
  buyDate: Date;

  constructor(stock: Stock, anzahl: number, buyPrice: number, buyDate: Date) {
    this.stock = stock;
    this.anzahl = anzahl;
    this.buyPrice = buyPrice;
    this.buyDate = buyDate;
    }
  }
