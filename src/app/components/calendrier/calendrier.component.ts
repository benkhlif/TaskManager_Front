import { Component, OnInit } from '@angular/core';
import { Projet, ProjetService } from 'src/app/services/projet.service';
import { Task, TaskService } from 'src/app/services/task.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Importer le plugin dayGrid

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  projets: Projet[] = [];
  selectedProjectId: number | null = null;
  tasks: Task[] = [];
  calendarEvents: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin], // Assure-toi d'ajouter dayGridPlugin ici
    initialView: 'dayGridMonth',
    events: []
  };

  constructor(private taskService: TaskService, private projetService: ProjetService) {}

  ngOnInit(): void {
    this.getProjets();
  }

  getProjets() {
    this.projetService.getProjets().subscribe((data) => {
      this.projets = data;
    });
  }

  onProjectChange() {
    if (this.selectedProjectId) {
      this.taskService.getTasksByProject(this.selectedProjectId).subscribe((data) => {
        this.tasks = data;
        this.updateCalendarEvents();
      });
    } else {
      this.tasks = [];
      this.calendarEvents = [];
    }
  }

  // Fonction pour mettre à jour les événements du calendrier avec les bonnes couleurs
  updateCalendarEvents() {
    this.calendarEvents = this.tasks.map(task => {
      let eventColor = '';

      // Définir la couleur en fonction du statut de la tâche
      switch (task.statut) {
        case 'TERMINEE':
          eventColor = 'green'; // Vert pour les tâches terminées
          break;
        case 'EN_COURS':
          eventColor = 'orange'; // Orange pour les tâches en cours
          break;
        case 'A_FAIRE':
          eventColor = 'red'; // Rouge pour les tâches à faire
          break;
        default:
          eventColor = 'gray'; // Par défaut, en gris si statut inconnu
      }

      return {
        title: task.titre,
        start: task.dateEcheance,
        allDay: true,
        color: eventColor // Attribuer la couleur à l'événement
      };
    });

    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.calendarEvents
    };
  }
}
