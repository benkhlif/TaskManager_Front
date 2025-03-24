import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/services/projet.service';
import { TaskService, Task } from 'src/app/services/task.service';  // Importer le service TaskService

@Component({
  selector: 'app-fiche-projet',
  templateUrl: './fiche-projet.component.html',
  styleUrls: ['./fiche-projet.component.css']
})
export class FicheProjetComponent implements OnInit {
  projet: any;
  tasks: Task[] = [];  // Liste des tâches associées au projet

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private taskService: TaskService,  // Injection du service TaskService
    private router: Router
  ) {}

  ngOnInit(): void {
    const projetId = this.route.snapshot.paramMap.get('id');
    if (projetId) {
      // Charger le projet
      this.projetService.getProjetById(+projetId).subscribe(
        (data) => {
          this.projet = data;
          // Après avoir chargé le projet, charger les tâches associées
          this.loadProjectTasks(this.projet.id);
        },
        (error) => console.error('Erreur lors du chargement du projet', error)
      );
    }
  }

  // Méthode pour charger les tâches du projet
  loadProjectTasks(projectId: number): void {
    this.taskService.getTasksByProject(projectId).subscribe(
      (tasks) => {
        this.tasks = tasks;  // Stocker les tâches du projet
      },
      (error) => console.error('Erreur lors du chargement des tâches', error)
    );
  }

  retourListe(): void {
    this.router.navigate(['/projets']);  // Redirection vers la liste des projets
  }
}
