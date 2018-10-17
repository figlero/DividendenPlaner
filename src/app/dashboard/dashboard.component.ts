import { Component, OnInit } from '@angular/core';
import {ChartService} from '../services/chart.service';
import {DepotControllerService} from '../services/depot-controller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  divChart = [];
  kursChart = [];
  topFive = [];

  constructor(private chartService: ChartService, private depotController: DepotControllerService) { }

  ngOnInit() {
    this.topFive = this.depotController.depot.positions;
    this.divChart = this.chartService.getDivChart();
    this.kursChart = this.chartService.getKursChart();
  }

}
