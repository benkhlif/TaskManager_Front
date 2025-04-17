 import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { DashboardStats, Task, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]  
})
export class DashboardComponent implements OnInit {
  tasksInProgress: number = 0;
  tasksCompleted: number = 0;
  tasksToDo: number = 0;
  upcomingTasks: Array<{ id: number; titre: string; dateEcheance: string }> = [];
  overdueTasks: Array<{ id: number; titre: string; dateEcheance: string }> = []; // Nouvelle propriété pour les tâches en retard

  progress: number = 0;

  selectedTask: Task | null = null; // Stocke les détails de la tâche sélectionnée

  constructor(private taskService: TaskService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getDashboardStats();
  }

   // 🔹 Récupérer les statistiques du tableau de bord
   getDashboardStats(): void {
    this.taskService.getDashbord().subscribe(
      (data: DashboardStats) => {
        this.tasksInProgress = data.tasksInProgress;
        this.tasksCompleted = data.tasksCompleted;
        this.tasksToDo = data.tasksToDo;
        this.progress = data.progress;

        // 🔹 Mettre à jour les tâches à venir
        this.upcomingTasks = data.upcomingTasks.map(task => ({
          id: task.id,
          titre: task.titre,
          dateEcheance: this.datePipe.transform(task.dateEcheance, 'dd MMM yyyy, HH:mm') || ''
        }));

        // 🔹 Mettre à jour les tâches en retard
        this.overdueTasks = data.overdueTasks.map(task => ({
          id: task.id,
          titre: task.titre,
          dateEcheance: this.datePipe.transform(task.dateEcheance, 'dd MMM yyyy, HH:mm') || ''
        }));
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des statistiques du tableau de bord:', error);
      }
    );
  }

  // 🔹 Afficher les détails d'une tâche sélectionnée
  showTaskDetails(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe(
      (task: Task) => {
        this.selectedTask = task;
      },
      (error: any) => {
        console.error(`Erreur lors de la récupération de la tâche ID ${taskId}:`, error);
      }
    );
  }

  // 🔹 Fermer les détails
  closeTaskDetails(): void {
    this.selectedTask = null;
  }
 
 
  // Méthode pour définir la couleur de la barre de progression
  getProgressColor(progress: number): string {
    if (progress < 30) {
      return '#ba1000'; // Rouge
    } else if (progress >= 30 && progress <= 70) {
      return '#ff6f61'; // Orange
    } else {
      return '#007233'; // Vert
    }
  }
}
