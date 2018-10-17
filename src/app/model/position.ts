import {Stock} from './stock';

export class Position {

  stock: Stock;
  anzahl: number;

  constructor(stock: Stock, anzahl: number) {
    this.stock = stock;
    this.anzahl = anzahl;
  }
}
