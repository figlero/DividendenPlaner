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
  depotController;

  constructor(private chartService: ChartService, private depotControllerService: DepotControllerService,
              private activatedRoute: ActivatedRoute, private databaseService: DatabaseService, private spinner: NgxSpinnerService) {
    this.depotController = this.depotControllerService;
  }

  ngOnInit() {
    this.spinner.show();
    //this.activatedRoute.params.subscribe(params => this.resolveParams(params));
    this.initUi();
  }

  resolveParams(params) {
    this.uid = Object.values(params)[0];
   // this.initUi(this.depotController.getDepot());
    //this.initUi(this.depotController.getDepot());
    // this.databaseService.getDepot(this.uid).then(depot => this.initUi(Object.values(depot.val())[0]));
  }

  initUi() {
    if (this.depotController.finishedLoading === true) {
      this.divChart = this.chartService.getDivChart();
      this.kursChart = this.chartService.getKursChart();
      this.spinner.hide();
    } else {
      setTimeout(() => this.initUi(), 500);
    }
  }
}
