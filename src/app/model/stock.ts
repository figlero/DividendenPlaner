export class Stock {

  name: String;
  symbol: String;
  divYield: number;

  constructor(name: String, symbol: String, divYield: number) {
    this.name = name;
    this.symbol = symbol;
    this.divYield = divYield;
  }
}
