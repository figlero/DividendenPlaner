import { Component, OnInit } from '@angular/core';
import {ChartService} from '../services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  divChart = [];

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.divChart = this.chartService.getDivChart();
  }

}
