import { Injectable } from '@angular/core';
import {User} from '../model/user';
import { AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  state: any;

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.fireauth.authState.subscribe(state => this.state = state);
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
    this.router.navigateByUrl('register');
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
}
