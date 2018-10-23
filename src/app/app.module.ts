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
import {NgxSpinnerModule} from 'ngx-spinner';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DepotverwaltungComponent,
    KaufComponent,
    StockOverviewComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [AuthService, ChartService, DepotControllerService, DatabaseService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
