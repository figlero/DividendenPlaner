import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../services/database.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Depot} from '../model/depot';
import {Position} from '../model/position';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DepotControllerService} from '../services/depot-controller.service';

declare function sellModal(visible): any;

@Component({
  selector: 'app-depotverwaltung',
  templateUrl: './depotverwaltung.component.html',
  styleUrls: ['./depotverwaltung.component.css']
})
export class DepotverwaltungComponent implements OnInit {

  uid;
  depot: Depot;
  displayedColumns: string[] = ['symbol', 'name', 'divyield', 'anzahl', 'verkaufen'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  toSell: Position;

  constructor(private activatedRoute: ActivatedRoute, private databaseService: DatabaseService, private spinner: NgxSpinnerService,
              private depotController: DepotControllerService) { }

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.params.subscribe(params => this.resolveParams(params), error1 => console.log(error1));
  }

  resolveParams(params)  {
    this.uid = Object.values(params)[0];
    this.initUi(this.depotController.getDepot());
  }

  initUi(depot) {
    this.depot = depot;
    this.dataSource = new MatTableDataSource<any>(this.depot.positions);
    this.dataSource.paginator = this.paginator;
    this.spinner.hide();
  }

  openSellModal(pos) {
    this.toSell = pos;
    console.log(pos);
    sellModal('show');
  }
  onSell(pos)  {
    console.log(pos);
    this.depotController.removePosition(this.uid, pos);
    this.dataSource = new MatTableDataSource<any>(this.depot.positions);
    this.dataSource.paginator = this.paginator;
    sellModal('hide');
  }
}
