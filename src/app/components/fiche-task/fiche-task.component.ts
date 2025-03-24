import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from 'src/app/services/task.service';

@Component({
  selector: 'app-fiche-task',
  templateUrl: './fiche-task.component.html',
  styleUrls: ['./fiche-task.component.css']
})
export class FicheTaskComponent implements OnInit {
  task: Task | undefined;  // Déclaration d'une tâche qui sera affichée

  constructor(
    private taskService: TaskService,  // Injection du service TaskService
    private route: ActivatedRoute  ,// Injection d'ActivatedRoute pour récupérer l'ID de la tâche dans l'URL
       private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');  // Récupère l'ID de la tâche depuis l'URL
    if (taskId) {
      this.getTaskDetails(parseInt(taskId));  // Récupère les détails de la tâche via le service
    }
  }

  // Méthode pour récupérer les détails de la tâche par ID
  getTaskDetails(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;  // Stocke la tâche récupérée dans la variable 'task'
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la tâche:', err);
      }
    });
  }
  retourListe(): void {
    this.router.navigate(['/tasks']);  
  }
}
