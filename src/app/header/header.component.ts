import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {DatabaseService} from '../services/database.service';
import {Stock} from '../model/stock';
import {Depot} from '../model/depot';
import {Position} from '../model/position';
import {DepotControllerService} from '../services/depot-controller.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  state: any;
  uid;

  constructor(private fireauth: AngularFireAuth, private authService: AuthService, private databaseService: DatabaseService, private depotController: DepotControllerService) { }

  ngOnInit() {
    this.fireauth.authState.subscribe(state => this.resolveObs(state));
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  resolveObs(state) {
    this.state = state;
    this.uid = state.uid;
  }

  onLogout() {
    this.authService.logOut();
  }

  testStore() {
    let depot = new Depot('dadadadada');
    let stock1 = new Stock('stock1', 'isin1', 1.0);
    let stock2 = new Stock('stock2', 'isin2', 2.0);
    let stock3 = new Stock('stock3', 'isin3', 3.0);
    let p1 = new Position(stock1, 4);
    let p2 = new Position(stock2, 5);
    let p3 = new Position(stock3, 6);
    depot.positions.push(p1);
    depot.positions.push(p2);
    depot.positions.push(p3);
    this.databaseService.storeDepot(depot);
    // console.log(this.;
   // console.log(this.depotController.allDepots[0].uid);
  }
}
