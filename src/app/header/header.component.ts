import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatPaginator} from '@angular/material';

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
  @ViewChild('languages') languages: ElementRef;

  constructor(private fireauth: AngularFireAuth, private authService: AuthService,
              private httpService: HttpService, private router: Router) {
    this.auth = authService;
  }

  ngOnInit() {
    this.httpService.getAllSymbols().then(value => {
      this.httpService.setAllSymbols(value);
      initTypeahead(value);
    }).catch(error => console.log('Error loading Symbols from API. ERROR: ' + error));
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
    for (const company of this.httpService.allSymbols)  {
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
