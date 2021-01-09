import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionsComponent } from './sessions/sessions.component';
import { RegisteredSessionsComponent } from './registered-sessions/registered-sessions.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { RegisterComponent } from './register/register.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { UploadComponent } from './upload/upload.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { OutdatedSessionComponent } from './outdated-session/outdated-session.component';
import { ChartsComponent } from './charts/charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { GaugeComponent } from './gauge/gauge.component';
import {NgxGaugeModule} from 'ngx-gauge';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlertComponent } from './alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionManagerComponent } from './session-manager/session-manager.component';
import { ModifySessionComponent } from './modify-session/modify-session.component';
import { ManagedSessionComponent } from './managed-session/managed-session.component';
import {ProfilComponent} from './profil/profil.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthGuardService} from './services/auth-guard.service';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SessionsComponent,
    RegisteredSessionsComponent,
    SessionDetailsComponent,
    RegisterComponent,
    CreateSessionComponent,
    UploadComponent,
    ScoreboardComponent,
    OutdatedSessionComponent,
    ChartsComponent,
    GaugeComponent,
    AlertComponent,
    AlertComponent,
    SessionManagerComponent,
    ModifySessionComponent,
    ManagedSessionComponent,
    ProfilComponent,
    UserManagerComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'session/:id',
                component: SessionDetailsComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'addSession',
                component: CreateSessionComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'manageSession',
                component: SessionManagerComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'manageSession/:id',
                component: ModifySessionComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'profil',
                component: ProfilComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'profil/:login',
                component: ProfilComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'users',
                component: UserManagerComponent,
                canActivate: [AuthGuardService]
            },
        ]),
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        HighchartsChartModule,
        NgxGaugeModule,
        NgbModule,
        FontAwesomeModule,
    ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
