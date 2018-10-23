import {Injectable} from '@angular/core';
import {Depot} from '../model/depot';
import {Position} from '../model/position';
import {DatabaseService} from './database.service';
import {AuthService} from './auth.service';
import {HttpService} from './http.service';


@Injectable({
  providedIn: 'root'
})
export class DepotControllerService {
  private depot;
  allDepots: Depot[];
  private lastWerte = [];

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
        this.initDepotData();
      }
    });
  }

  getDepot(): Depot {
    return this.depot;
  }

  addPosition(uid, pos: Position) {
    this.depot.positions.push(pos);
    this.databaseService.changePosition(uid, this.depot);
    // this.setDepot(this.databaseService.getDepot(uid), uid);
  }

  removePosition(uid, pos: Position) {
    this.depot.positions.splice(this.depot.positions.indexOf(pos), 1);
    this.databaseService.changePosition(uid, this.depot);
    // this.setDepot(this.databaseService.getDepot(uid), uid);
  }

  initDepotData() {
    this.loadLastWerte();
  }

  loadLastWerte() {
    for (const pos of this.depot.positions) {
      this.httpService.getLastPrice(pos.stock.symbol).subscribe(value => this.lastWerte.push({price: value.price, anzahl: pos.anzahl}));
    }
  }
    getGesamtWert() {
    let summe = 0.0;
      for (const w of this.lastWerte) {
        summe += (w.price * w.anzahl);
      }
      return summe;
    }
}
