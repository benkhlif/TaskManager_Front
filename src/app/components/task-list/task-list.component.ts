import { Component, OnInit, TrackByFunction } from '@angular/core';
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
    private taskService: TaskService,
    private projetService: ProjetService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Charger les tâches et compléter les infos si nécessaire
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasks.forEach(task => {
          this.fetchProjetDetails(task);
          this.fetchAssigneeDetails(task);
        });
      },
      error: () => this.errorMessage = 'Erreur lors du chargement des tâches'
    });
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
}
