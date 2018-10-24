import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user';
import {Router, RouterModule} from '@angular/router';

declare function registerModal(): any;
declare function exitModal(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  alert: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(12)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6),
        Validators.maxLength(12)])
    });
  }

  onSubmit()  {
   const user = new User(this.registerForm.get('email').value, this.registerForm.get('password').value);
    this.authService.signUpUser(user);
    // registerModal();
  }

  goToLogin() {
    exitModal();
    setTimeout(() => this.router.navigateByUrl('/login'), 500);
  }
}
