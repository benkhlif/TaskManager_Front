import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProjetListComponent } from './components/projet-list/projet-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: "tasks", component: TaskListComponent },
  { path: "projets", component: ProjetListComponent },
  { path: "users", component: UserListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Charge les routes
  exports: [RouterModule] // Rend RouterModule utilisable dans toute l’application
})
export class AppRoutingModule { }
