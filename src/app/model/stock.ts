export class Stock {

  name: String;
  isin: String;
  divYield: number;

  constructor(name: String, isin: String, divYield: number) {
    this.name = name;
    this.isin = isin;
    this.divYield = divYield;
  }
}
