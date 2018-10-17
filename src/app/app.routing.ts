import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardGuard} from './dashboard/dashboard.guard';
import {DepotverwaltungComponent} from './depotverwaltung/depotverwaltung.component';
import {KaufComponent} from './kauf/kauf.component';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard]},
  {path: 'depotverwaltung', component: DepotverwaltungComponent, canActivate: [DashboardGuard]},
  {path: 'kaufen', component: KaufComponent, canActivate: [DashboardGuard]}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
