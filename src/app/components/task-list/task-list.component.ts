import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetService } from 'src/app/services/projet.service';
import { Task, TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
 
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage: string = '';
  trackByTaskId!: TrackByFunction<Task>;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private projetService: ProjetService,
    private userService: UserService,
        private router: Router
    
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Charger les tâches et compléter les infos si nécessaire
  loadTasks(): void {
    const role = this.authService.getRole();  // Vous devez avoir une méthode pour récupérer le rôle de l'utilisateur

    if (role === 'employee') {
      this.taskService.getMyTasks().subscribe(
        tasks => this.tasks = tasks,
        error => this.errorMessage = 'Erreur de chargement des tâches.'
      );
    } else if (role === 'ChefProjet') {
      this.taskService.getChefDeProjetTasks().subscribe(
        tasks => this.tasks = tasks,
        error => this.errorMessage = 'Erreur de chargement des tâches.'
      );
    } else if (role === 'MANAGER') {
      this.taskService.getTasks().subscribe(
        tasks => this.tasks = tasks,
        error => this.errorMessage = 'Erreur de chargement des tâches.'
      );
    }
    else {
      this.errorMessage = 'Rôle inconnu ou non autorisé.';
    }
  }

  // Récupérer les détails du projet si ce n'est qu'un ID
  fetchProjetDetails(task: Task) {
    if (task.projet && typeof task.projet === 'number') {
      this.projetService.getProjetById(task.projet).subscribe(projet => {
        task.projet = projet;
      });
    }
  }

  // Récupérer les détails de l'assigné si ce n'est qu'un ID
  fetchAssigneeDetails(task: Task) {
    if (task.assignee && typeof task.assignee === 'number') {
      this.userService.getUserById(task.assignee).subscribe(user => {
        task.assignee = user;
      });
    }
  }

  // Supprimer une tâche
  deleteTask(id: number): void {
    if (confirm('Voulez-vous supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
  onCreate(): void {
    this.router.navigate(['/creertask']);
  }
  modifier(projetId: number): void {
    this.router.navigate(['/modifiertask', projetId]);
  }
  consulter(projetId: number): void {
    this.router.navigate([`/fichetask`, projetId]);
  }
  get tasksAFaire(): Task[] {
    return this.tasks?.filter(t => t.statut === 'A_FAIRE') || [];
  }
  
  get tasksEnCours(): Task[] {
    return this.tasks?.filter(t => t.statut === 'EN_COURS') || [];
  }
  
  get tasksTerminees(): Task[] {
    return this.tasks?.filter(t => t.statut === 'TERMINEE') || [];
  }
  
  
}
