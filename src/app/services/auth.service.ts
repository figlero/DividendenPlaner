import { Injectable } from '@angular/core';
import {User} from '../model/user';
import { AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DepotControllerService} from './depot-controller.service';
import {DatabaseService} from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  state: any;

  constructor(private fireauth: AngularFireAuth, private router: Router, private depotController: DepotControllerService,
              private databaseService: DatabaseService) {
    this.fireauth.authState.subscribe(state => this.stateChange(state));
  }

  signUpUser(user: User) {
    this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(function (error) {
        console.log(error);
      });
  }

  signInUser(user: User) {
    return this.fireauth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logOut()  {
    this.fireauth.auth.signOut();
  }

  isAuthenticated() {
    if  (this.state === null) {
      return false;
    } else  {
      return true;
    }
  }

  getUid()  {
    return this.state.uid;
  }

  stateChange(state) {
    this.state = state;
    if (this.state === null) {
      this.router.navigateByUrl('login');
    } else {
      this.depotController.setDepot(this.databaseService.getDepot(this.getUid()), this.getUid());
      this.router.navigateByUrl('dashboard/' + this.getUid());
    }
  }
}
