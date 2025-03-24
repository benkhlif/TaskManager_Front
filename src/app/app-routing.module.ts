import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProjetListComponent } from './components/projet-list/projet-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreerProjetComponent } from './components/creer-projet/creer-projet.component';
import { ModifierProjetComponent } from './components/modifier-projet/modifier-projet.component';
import { FicheProjetComponent } from './components/fiche-projet/fiche-projet.component';
import { CreerUserComponent } from './components/creer-user/creer-user.component';
import { ModifierUserComponent } from './components/modifier-user/modifier-user.component';
import { FicheUserComponent } from './components/fiche-user/fiche-user.component';
import { CreerTaskComponent } from './components/creer-task/creer-task.component';
import { ModifierTaskComponent } from './components/modifier-task/modifier-task.component';
import { FicheTaskComponent } from './components/fiche-task/fiche-task.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
 
const routes: Routes = [
  { path: "tasks", component: TaskListComponent },
  { path: "projets", component: ProjetListComponent },
  { path: "users", component: UserListComponent },
  { path: "creerprojet", component: CreerProjetComponent },
  { path: "modifierprojet/:id", component: ModifierProjetComponent },
  { path: 'ficheprojet/:id', component: FicheProjetComponent } ,
  { path: 'creeruser', component: CreerUserComponent } ,
  { path: 'modifieruser/:id', component: ModifierUserComponent } ,
  { path: 'ficheuser/:id', component: FicheUserComponent } ,
  { path: 'creertask', component: CreerTaskComponent } ,
  { path: 'modifiertask/:id', component: ModifierTaskComponent } ,
  { path: 'fichetask/:id', component: FicheTaskComponent } ,
  { path: 'navbar', component: NavbarComponent } ,
  { path: 'login', component: LoginComponent } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Charge les routes
  exports: [RouterModule] // Rend RouterModule utilisable dans toute l’application
})
export class AppRoutingModule { }
