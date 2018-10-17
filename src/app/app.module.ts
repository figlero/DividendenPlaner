import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import {routing} from './app.routing';
import {environment} from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChartService} from './services/chart.service';
import {DepotControllerService} from './services/depot-controller.service';
import {DatabaseService} from './services/database.service';
import { DepotverwaltungComponent } from './depotverwaltung/depotverwaltung.component';
import { KaufComponent } from './kauf/kauf.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DepotverwaltungComponent,
    KaufComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, ChartService, DepotControllerService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
