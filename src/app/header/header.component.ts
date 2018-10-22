import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';

declare function initTypeahead(symbols): any;
declare function searchModal(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({search : new FormControl('')});
  auth;
  allSymbols;
  @ViewChild('languages') languages: ElementRef;

  constructor(private fireauth: AngularFireAuth, private authService: AuthService,
              private httpService: HttpService, private router: Router) {
    this.auth = authService;
  }

  ngOnInit() {
    this.httpService.getAllSymbols().then(value => this.initSymbols(value)).catch(reason => console.log(
      'loading symbols failed. reason: ' + reason ));
  }

  initSymbols(symbols)  {
    this.allSymbols = symbols;
    initTypeahead(this.allSymbols);
  }

  onSearch(value) {
      const symbol = this.getSymbolFromNameName(value);
      if  (symbol !== '') {
        this.router.navigateByUrl('/aktienübersicht/' + this.authService.getUid() + '/' + symbol);
      } else  {
        searchModal();
      }
  }

  getSymbolFromNameName(name): String {
    for (const company of this.allSymbols)  {
      if  (company.name === name)  {
        return company.symbol;
      }
    }
    return '';
  }

  onLogout() {
    this.authService.logOut();
  }
}
