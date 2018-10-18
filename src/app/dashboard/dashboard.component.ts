import {Component, Input, OnInit} from '@angular/core';
import {ChartService} from '../services/chart.service';
import {DepotControllerService} from '../services/depot-controller.service';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../services/database.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Depot} from '../model/depot';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  divChart = [];
  kursChart = [];
  topFive = [];
  uid;
  allDepots: Depot[];
  depot: Depot;

  constructor(private chartService: ChartService, private depotController: DepotControllerService,
              private activatedRoute: ActivatedRoute, private databaseService: DatabaseService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.params.subscribe(params =>  this.resolveParams(params));
    this.divChart = this.chartService.getDivChart();
    this.kursChart = this.chartService.getKursChart();
  }

  resolveParams(params)  {
    this.uid = Object.values(params)[0];
    this.databaseService.getDepot(this.uid).then(depot => this.initUi(Object.values(depot.val())[0]));
  }

  initUi(depot) {
    this.depot = depot;
    this.topFive = this.depot.positions;
    this.spinner.hide();
  }
}
