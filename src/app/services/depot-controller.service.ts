import {Injectable} from '@angular/core';
import {Depot} from '../model/depot';
import {Position} from '../model/position';
import {DatabaseService} from './database.service';
import {AuthService} from './auth.service';
import {HttpService} from './http.service';
import {Stock} from '../model/stock';


@Injectable({
  providedIn: 'root'
})
export class DepotControllerService {
  private depot;
  allDepots: Depot[];
  depotWerte = [];
  finishedLoading: boolean;

  constructor(private databaseService: DatabaseService, private httpService: HttpService) {
    this.databaseService.depots.subscribe(value => this.allDepots = value, error => console.log(error));
  }

  setDepot(depotPromise: Promise<any>, uid) {
    depotPromise.then(value => {
      if (value.val() === null || value.val() === undefined) {
        const depot = new Depot(uid);
        this.databaseService.storeDepot(depot);
        this.depot = depot;
        this.initDepotData();
      } else {
        this.depot = Object.values(value.val())[0];
        if (this.depot.positions === undefined) {
          this.depot.positions = [];
        }
        this.initDepotData();
      }
    });
  }

  getDepot(): Depot {
    return this.depot;
  }

  addPosition(uid, stock: Stock, anzahl: number) {
    this.httpService.getLastPrice(stock.symbol).subscribe(value => {
      const pos = new Position(stock, anzahl, value.price, new Date());
      this.depot.positions.push(pos);
      this.databaseService.changePosition(uid, this.depot);
      this.loadDepotWerte();
    });
    // this.setDepot(this.databaseService.getDepot(uid), uid);
  }

  removePosition(uid, pos: Position) {
    this.depot.positions.splice(this.depot.positions.indexOf(pos), 1);
    this.databaseService.changePosition(uid, this.depot);
    this.loadDepotWerte();
    // this.setDepot(this.databaseService.getDepot(uid), uid);
  }

  initDepotData() {
    this.loadDepotWerte();
  }

  loadDepotWerte() {
    this.finishedLoading = false;
    this.depotWerte = [];
    if (this.depot.positions.length > 0) {
    for (const pos of this.depot.positions) {
      this.httpService.getLastPrice(pos.stock.symbol).subscribe(value => {
        this.httpService.getKeyStats(value.symbol).then(value1 => {
          this.httpService.getLogo(value.symbol).then(logo => {
            this.callBackDepotWerte(pos, value.price, value1.dividendYield, value1.dividendRate, logo);
        });
        });
    });
    }
    } else {
      this.finishedLoading = true;
    }
  }

  callBackDepotWerte(pos: Position, price, divYield, dividend, logo) {
    const anzahl = pos.anzahl;
    const wert = anzahl * price;
    const diff = price - pos.buyPrice;
    const change = diff / price * 100;
    this.depotWerte.push({pos: pos, price: price, divYield: divYield, dividend: dividend, wert: wert, logo: logo, change: change});
    this.finishedLoading = true;
  }

  getGesamtWert() {
    let summe = 0.0;
    for (const w of this.depotWerte) {
      summe += (w.price * w.pos.anzahl);
    }
    return summe;
  }

  getAverageDivYield() {
    let divYield = 0.0;
    for (const w of this.depotWerte) {
      divYield += (w.price * w.pos.anzahl * w.divYield);
    }
    divYield = divYield / this.getGesamtWert();
    return divYield;
  }

  getPersonalDivYield() {
    let divYield = 0.0;
    for (const w of this.depotWerte) {
      divYield += (w.price * w.pos.anzahl * (w.dividend / w.pos.buyPrice * 100));
    }
    divYield = divYield / this.getGesamtWert();
    return divYield;
  }

  getBiggestFive(): any[] {
    let sorted = this.depotWerte.sort((a, b) => {
      if (a.wert > b.wert) {
        return -1;
      } else if (a.wert < b.wert) {
        return 1;
      } else {
        return 0;
      }
    });
    sorted = sorted.slice(0, 5);
    return sorted;
  }
}
