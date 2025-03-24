import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ProjetService } from 'src/app/services/projet.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-creer-task',
  templateUrl: './creer-task.component.html',
  styleUrls: ['./creer-task.component.css']
})
export class CreerTaskComponent {
  task: any = { assignee: {}, projet: {} };
  users$ = this.userService.getEmployee();  // Observable pour la liste des utilisateurs
  projets$ = this.projetService.getProjets();  // Observable pour la liste des projets

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projetService: ProjetService,
    private router: Router,
    private datePipe: DatePipe // Injection de DatePipe pour formater la date
  ) {}

  onSubmit(): void {
    // Formater la date avant l'envoi
    if (this.task.dateEcheance) {
      // Formater la date pour être compatible avec le format attendu par le backend
      this.task.dateEcheance = this.datePipe.transform(this.task.dateEcheance, 'yyyy-MM-ddTHH:mm:ss');
    }

    this.taskService.createTask(this.task).subscribe({
      next: () => {
        alert('Tâche créée avec succès');
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        alert('Erreur lors de la création de la tâche');
        console.error('Erreur:', err);
      }
    });
  }
}
