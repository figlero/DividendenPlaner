import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(12)]),
    });
  }

  resetForm() {
    console.log(this.loginForm);
    this.loginForm.reset();
  }

  onSubmit()  {
    const user = new User(this.loginForm.get('email').value, this.loginForm.get('password').value);
    const promise = this.authService.signInUser(user);
    promise
      .then(_ => console.log('login successfull'))
      .catch(err => console.log(err));
  }
}
