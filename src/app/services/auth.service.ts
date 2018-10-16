import { Injectable } from '@angular/core';
import {User} from '../model/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth) {}

  signUpUser(user: User) {
    this.fireauth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(function (error) {
        console.log(error);
      });
  }
}
