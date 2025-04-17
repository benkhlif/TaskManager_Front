import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjetListComponent } from './components/projet-list/projet-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreerProjetComponent } from './components/creer-projet/creer-projet.component';
import { ModifierProjetComponent } from './components/modifier-projet/modifier-projet.component';
import { FicheProjetComponent } from './components/fiche-projet/fiche-projet.component';
import { FicheUserComponent } from './components/fiche-user/fiche-user.component';
import { ModifierUserComponent } from './components/modifier-user/modifier-user.component';
import { CreerUserComponent } from './components/creer-user/creer-user.component';
import { CreerTaskComponent } from './components/creer-task/creer-task.component';
import { ModifierTaskComponent } from './components/modifier-task/modifier-task.component';
import { FicheTaskComponent } from './components/fiche-task/fiche-task.component';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    ProjetListComponent,
    UserListComponent,
    CreerProjetComponent,
    ModifierProjetComponent,
    FicheProjetComponent,
    FicheUserComponent,
    ModifierUserComponent,
    CreerUserComponent,
    CreerTaskComponent,
    ModifierTaskComponent,
    FicheTaskComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    NotificationsComponent,
    CalendrierComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule,
     HttpClientModule  ,ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule, MatDialogModule,
     FullCalendarModule,
  ],
  providers: [DatePipe],  
    bootstrap: [AppComponent]
})
export class AppModule { }
