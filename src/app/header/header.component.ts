import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {DatabaseService} from '../services/database.service';
import {Stock} from '../model/stock';
import {Depot} from '../model/depot';
import {Position} from '../model/position';
import {DepotControllerService} from '../services/depot-controller.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  state: any;
  uid;

  constructor(private fireauth: AngularFireAuth, private authService: AuthService,
              private databaseService: DatabaseService, private depotController: DepotControllerService) { }

  ngOnInit() {
    this.fireauth.authState.subscribe(state => this.resolveObs(state));
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  resolveObs(state) {
    this.state = state;
    this.uid = state.uid;
  }

  onLogout() {
    this.authService.logOut();
  }
}
