import { Component, OnInit, TrackByFunction } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  userRole: string | null | undefined;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private projetService: ProjetService,
    private userService: UserService,
        private router: Router, private snackBar: MatSnackBar
    
  ) {}

  ngOnInit(): void {
    this.loadTasks();  this.userRole = this.authService.getRole(); // Récupérer le rôle de l'utilisateur

  }

  // Charger les tâches et compléter les infos si nécessaire
  loadTasks(): void {
    const role = this.authService.getRole();  // Vous devez avoir une méthode pour récupérer le rôle de l'utilisateur

    if (role === 'EMPLOYE') {
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
    // Vérification du rôle de l'utilisateur
    const userRole = this.authService.getRole(); // Si tu as une méthode qui récupère le rôle de l'utilisateur
    
    if (userRole !== 'ChefProjet') {
      // Si l'utilisateur n'a pas le rôle 'ChefProjet', on lui affiche un message d'erreur
      this.snackBar.open("⛔ Vous n'avez pas les droits nécessaires pour supprimer cette tâche.", 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',  // Affichage en haut de l'écran
        horizontalPosition: 'center', // Centré horizontalement
        panelClass: ['red-snackbar'] // Classe CSS personnalisée pour un message d'erreur
      });
      return;  // Empêche la suppression si l'utilisateur n'est pas un manager
    }
  
    // Si l'utilisateur est un manager, on lui demande une confirmation avant de supprimer la tâche
    if (confirm('Voulez-vous supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks(); // Recharger la liste des tâches après la suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          this.snackBar.open('❌ Erreur lors de la suppression de la tâche', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['red-snackbar']
          });
        }
      });
    }
  }
  


  onCreate(): void {
    this.router.navigate(['/creertask']);
  }
  modifier(projetId: number): void {
    const userRole = this.authService.getRole(); // Récupérer le rôle de l'utilisateur
    
    // Vérifier si l'utilisateur a le rôle 'MANAGER' (ou un autre rôle approprié)
    if (userRole  == 'MANAGER') {
      // Si l'utilisateur n'est pas un MANAGER, afficher une alerte
      this.snackBar.open("⛔Accès refusé !🚫 Seul le Chef de projet peut modifier les tâches associées pour des raisons de sécurité et d'intégrité🔒🛡️.", 'Fermer', {
        duration: 5000,
        verticalPosition: 'top',  // Affiche en haut de l'écran
        horizontalPosition: 'center', // Centré horizontalement
        panelClass: ['red-snackbar'] // Classe CSS pour un message d'erreur
      });
      return;  // Ne pas naviguer vers la page de modification si l'utilisateur n'a pas le bon rôle
    }
  
    // Si l'utilisateur a le rôle approprié, naviguer vers la page de modification
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
