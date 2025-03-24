import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ProjetService } from 'src/app/services/projet.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modifier-task',
  templateUrl: './modifier-task.component.html',
  styleUrls: ['./modifier-task.component.css']
})
export class ModifierTaskComponent implements OnInit {
  task: any = { assignee: {}, projet: {} };  // Initialisation de la tâche
  users$ = this.userService.getEmployee();  // Observable pour la liste des utilisateurs
  projets$ = this.projetService.getProjets();  // Observable pour la liste des projets
  taskId: number = 0;  // Identifiant de la tâche à modifier

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projetService: ProjetService,
    private router: Router,
    private route: ActivatedRoute, // Pour accéder aux paramètres de la route
    private datePipe: DatePipe // Pour formater la date
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la tâche à modifier depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.taskId = +params.get('id')!;
      this.getTaskDetails();  // Charger les détails de la tâche
    });
  }

  // Charger les détails de la tâche
  getTaskDetails(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.task = task;
        this.task.dateEcheance = this.datePipe.transform(task.dateEcheance, 'yyyy-MM-ddTHH:mm:ss'); // Formater la date
      },
      error: (err) => {
        alert('Erreur lors du chargement de la tâche');
        console.error('Erreur:', err);
      }
    });
  }

  // Soumettre le formulaire de modification de la tâche
  onSubmit(): void {
    if (this.task.dateEcheance) {
      // Formater la date avant l'envoi
      this.task.dateEcheance = this.datePipe.transform(this.task.dateEcheance, 'yyyy-MM-ddTHH:mm:ss');
    }

    this.taskService.updateTask(this.taskId, this.task).subscribe({
      next: () => {
        alert('Tâche modifiée avec succès');
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        alert('Erreur lors de la mise à jour de la tâche');
        console.error('Erreur:', err);
      }
    });
  }
}
