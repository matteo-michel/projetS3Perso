import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { OutdatedSessionComponent } from './outdated-session/outdated-session.component';
import { ChartsComponent } from './charts/charts.component';
import { HighchartsChartModule } from 'highcharts-angular';

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
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
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
        component: SessionDetailsComponent
      },
      {
        path: 'addSession',
        component: CreateSessionComponent
      },
      {
        path: 'scoreboard',
        component: ScoreboardComponent
      }
    ]),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
