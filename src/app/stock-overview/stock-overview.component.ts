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
    this.httpService.getCompanyData(this.symbol).then(value1 => {
      console.log(value1);
      const string = JSON.stringify(value1);
      const json = JSON.parse(string);
      this.companyName = json.companyName;
      this.day30Change = json.day30ChangePercent;
      this.dividendRate = json.dividendRate;
      this.dividendYield = json.dividendYield;
      this.exDividendDate = json.exDividendDate;
      this.httpService.getLogo(this.symbol).then(value2 => {
        this.imgSrc = JSON.parse(JSON.stringify(value2)).url;
        this.spinner.hide();
      });
    });
  }

  onBuy(anzahl) {
    const s = new Stock(this.companyName, this.symbol, this.dividendYield);
    const p = new Position(s, anzahl);
    this.depotController.addPosition(this.authService.getUid(), p);
    buyModal('hide');
  }

}
