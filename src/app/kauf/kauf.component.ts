import {ApplicationRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from '../services/database.service';
import {HttpService} from '../services/http.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Stock} from '../model/stock';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormsModule } from '@angular/forms';
import {Position} from '../model/position';
import {DepotControllerService} from '../services/depot-controller.service';

declare function quickBuyModal(visible);

@Component({
  selector: 'app-kauf',
  templateUrl: './kauf.component.html',
  styleUrls: ['./kauf.component.css'],
  animations: [
    trigger('flyIn', [
      transition('close => open', [
        style({opacity: 0 }),
        animate('3000ms', style({ opacity: 1 })),
      ]),
    ])
  ],
})

export class KaufComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'name', 'details', 'anzahl', 'kaufen'];
  expandedElement: Stock;
  dataSource;
  animate = 'close';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(DataTableDirective)
    http: HttpService;
  anzahlArray = [];
  test;

  constructor(private databaseService: DatabaseService, private httpService: HttpService, private appRef: ApplicationRef,
              private spinner: NgxSpinnerService, private router: Router, private authService: AuthService, private depotController: DepotControllerService) {
    this.http = this.httpService;
  }

  ngOnInit() {
    this.spinner.show();
    this.dataSource = new MatTableDataSource<any>(this.httpService.allSymbols);
    this.dataSource.paginator = this.paginator;
    this.spinner.hide();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDetails(stock) {
    this.router.navigateByUrl('/aktienübersicht/' + this.authService.getUid() + '/' + stock.symbol);
  }

  onBuy(element, i) {
    const input = document.getElementById('input' + i);
    const s = new Stock(element.name, element.symbol);

    this.spinner.show();
    // @ts-ignore
    this.depotController.addPosition(this.authService.getUid(), s, input.value);
    this.onBuyAwait(input);
  }

  onBuyAwait(input) {
    this.animate = 'close';
    if  (this.depotController.finishedLoading ===  true) {
      input.value = '';
      this.spinner.hide();
      this.animate = 'open';
      quickBuyModal('show');

    } else {
      setTimeout(() => this.onBuyAwait(input), 500);
    }
  }
}
