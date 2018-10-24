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

@Component({
  selector: 'app-kauf',
  templateUrl: './kauf.component.html',
  styleUrls: ['./kauf.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class KaufComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'name', 'details', 'kaufen'];
  expandedElement: Stock;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(DataTableDirective)
    http: HttpService;

  constructor(private databaseService: DatabaseService, private httpService: HttpService, private appRef: ApplicationRef,
              private spinner: NgxSpinnerService, private router: Router, private authService: AuthService) {
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

  test(value) {
    console.log(value);
  }
}
