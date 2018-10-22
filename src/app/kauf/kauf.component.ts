import {ApplicationRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from '../services/database.service';
import {HttpService} from '../services/http.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-kauf',
  templateUrl: './kauf.component.html',
  styleUrls: ['./kauf.component.css']
})
export class KaufComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  allStocks;
  dtTrigger: Subject<any> = new Subject();

  constructor(private databaseService: DatabaseService, private httpService: HttpService, private appRef: ApplicationRef,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.httpService.getAllSymbols().then(value => this.initGui(value));
  }
  initGui(value) {
    this.allStocks = value;
    this.dtTrigger.next();
    this.spinner.hide();
  }
}
