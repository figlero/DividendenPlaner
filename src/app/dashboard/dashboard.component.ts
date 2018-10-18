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
      this.activatedRoute.params.subscribe(params =>  this.uid = params);
  }

  ngOnInit() {
    this.spinner.show();
    this.databaseService.depots.subscribe(value => this.resolveObs(value), error1 => console.log(error1)
    , ()  => console.log('complete'));

    this.divChart = this.chartService.getDivChart();
    this.kursChart = this.chartService.getKursChart();
  }

  resolveObs(value)  {
    this.allDepots = value;
    this.depot = this.allDepots[0];
    this.topFive = this.depot.positions;
    this.spinner.hide();
  }

}
