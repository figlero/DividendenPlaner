import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../services/database.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Depot} from '../model/depot';
import {Position} from '../model/position';

declare function sellModal(visible): any;

@Component({
  selector: 'app-depotverwaltung',
  templateUrl: './depotverwaltung.component.html',
  styleUrls: ['./depotverwaltung.component.css']
})
export class DepotverwaltungComponent implements OnInit {

  allDepots: Depot[];
  uid;
  depot: Depot;
  toSell: Position;

  constructor(private activatedRoute: ActivatedRoute, private databaseService: DatabaseService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.params.subscribe(params => this.resolveParams(params), error1 => console.log(error1));
  }

  resolveParams(params)  {
    this.uid = Object.values(params)[0];
    this.databaseService.getDepot(this.uid).then(depot => this.initUi(Object.values(depot.val())[0]));
  }

  initUi(depot) {
    this.depot = depot;
    this.spinner.hide();
  }

  openSellModal(pos) {
    this.toSell = pos;
    console.log(pos);
    sellModal('show');
  }
  onSell(posi)  {
    this.depot.positions.splice(this.depot.positions.indexOf(posi), 1);
    this.databaseService.removePosition(this.uid, this.depot);
    sellModal('hide');
  }

}
