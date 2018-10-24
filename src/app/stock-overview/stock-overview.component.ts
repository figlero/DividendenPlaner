import {Component, OnInit} from '@angular/core';
import {ChartService} from '../services/chart.service';
import {HttpService} from '../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Chart} from 'chart.js';
import {DepotControllerService} from '../services/depot-controller.service';
import {Position} from '../model/position';
import {Stock} from '../model/stock';
import {AuthService} from '../services/auth.service';

declare function buyModal(visibility): any;

@Component({
  selector: 'app-stock-overview',
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.css']
})
export class StockOverviewComponent implements OnInit {

  kursChartStock: Chart;
  symbol;
  dataset;
  companyName: string;
  day30Change: number;
  dividendYield: number;
  dividendRate: string;
  exDividendDate;
  imgSrc;
  uid;
  companyData;

  constructor(private chartService: ChartService, private httpService: HttpService, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService,
              private depotController: DepotControllerService, private authService: AuthService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.params.subscribe(value => this.initGUI(value), error1 => console.log(error1), () => console.log('complete'));
  }

  initGUI(value) {
    this.uid = value.uid;
    this.symbol = value.symbol;
    this.httpService.getData1Y(this.symbol).subscribe(data => this.dataset = data, error1 => console.log(error1),
      () => {
        if (this.kursChartStock !== undefined) {
          this.kursChartStock.destroy();
        }
        this.kursChartStock = this.chartService.getKursChartStock(this.dataset);
      }
    );
    this.httpService.getKeyStats(this.symbol).then(value1 => {
      this.companyName = value1.companyName;
      this.day30Change = value1.day30ChangePercent;
      this.dividendRate = value1.dividendRate;
      this.dividendYield = value1.dividendYield;
      this.exDividendDate = value1.exDividendDate;
      this.httpService.getLogo(this.symbol).then(src => {
        this.imgSrc = src;
        this.httpService.getCompanyData(this.symbol).then(companyData => {
          this.companyData = companyData;
          this.spinner.hide();
        })
      });
    });
  }

  onBuy(anzahl) {
    const s = new Stock(this.companyName, this.symbol);
   //const p = new Position(s, anzahl);
    this.depotController.addPosition(this.authService.getUid(), s, anzahl);
    buyModal('hide');
  }

}
