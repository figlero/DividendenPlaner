import {Injectable} from '@angular/core';
import {Depot} from '../model/depot';
import {Stock} from '../model/stock';
import {Position} from '../model/position';
import {AuthService} from './auth.service';
import {DatabaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class DepotControllerService {
  depot: Depot;
  allDepots: Depot[];

  constructor(private authService: AuthService, private databaseService: DatabaseService) {
    this.databaseService.depots.subscribe(value => this.allDepots = value, error => console.log(error));
    this.initDepot();
  }

  initDepot() {
    this.depot = new Depot(this.authService.getUid());
    const stock = new Stock('stock1', 'isin1', 3.5);
    const stock2 = new Stock('stock2', 'isin2', 2.5);
    const stock3 = new Stock('stock3', 'isin3', 1.5);
    const stock4 = new Stock('stock4', 'isin4', 4.5);
    const stock5 = new Stock('stock5', 'isin5', 5.5);
    const position = new Position(stock, 3);
    const position2 = new Position(stock2, 1);
    const position3 = new Position(stock3, 10);
    const position4 = new Position(stock4, 5);
    const position5 = new Position(stock5, 2);
    this.depot.positions.push(position);
    this.depot.positions.push(position2);
    this.depot.positions.push(position3);
    this.depot.positions.push(position4);
    this.depot.positions.push(position5);
    this.databaseService.storeDepot(this.depot);
  }
}
