import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { ProjetService } from 'src/app/services/projet.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modifier-task',
  templateUrl: './modifier-task.component.html',
  styleUrls: ['./modifier-task.component.css']
})
export class ModifierTaskComponent implements OnInit {
  task: any = {
    id: null,
    titre: '',
    description: '',
    statut: '',
    assignee: { id: 0, nom: '', email: '', role: '' },
    projet: { id: 0, nom: '' },
    dateEcheance: null
  };
  users: any[] = [];
  projets: any[] = [];
  statutOptions: string[] = ['A_FAIRE', 'EN_COURS', 'TERMINEE'];
  userRole: string | null = null; // Récupérer le rôle de l'utilisateur

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Service d'authentification
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole(); // Récupérer le rôle de l'utilisateur
    this.getTaskDetails();
    this.getUsers();
    this.getMyProjets();
  }

  getTaskDetails(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;  // Récupérer l'ID de la tâche depuis l'URL
    this.taskService.getTaskById(taskId).subscribe(
      (data) => {
        this.task = {
          ...data,
          assignee: data.assignee || { id: 0, nom: '', email: '', role: '' },
          projet: data.projet || { id: 0, nom: '' }
        };
        this.applyRolePermissions();
      },
      (error) => {
        console.error('Erreur lors de la récupération de la tâche', error);
      }
    );
  }

  getUsers(): void {
    this.userService.getEmployee().subscribe(
      (data) => { this.users = data; },
      (error) => { console.error('Erreur lors de la récupération des utilisateurs', error); }
    );
  }

  getMyProjets(): void {
    this.projetService.getMyProjets().subscribe(
      (data) => { this.projets = data; },
      (error) => { console.error('Erreur lors de la récupération des projets', error); }
    );
  }

  applyRolePermissions(): void {
    // Si l'utilisateur est un Employé, tous les champs sauf le statut sont désactivés
    if (this.userRole === 'EMPLOYE') {
      document.getElementById('titre')?.setAttribute('disabled', 'true');
      document.getElementById('description')?.setAttribute('disabled', 'true');
      document.getElementById('assignee')?.setAttribute('disabled', 'true');
      document.getElementById('projet')?.setAttribute('disabled', 'true');
      document.getElementById('dateEcheance')?.setAttribute('disabled', 'true');
      document.getElementById('statut')?.removeAttribute('disabled'); // Le statut reste modifiable
    }
  
    // Si l'utilisateur est un Manager, tous les champs sont désactivés
    if (this.userRole === 'MANAGER') {
      document.getElementById('titre')?.setAttribute('disabled', 'true');
      document.getElementById('description')?.setAttribute('disabled', 'true');
      document.getElementById('statut')?.setAttribute('disabled', 'true');
      document.getElementById('assignee')?.setAttribute('disabled', 'true');
      document.getElementById('projet')?.setAttribute('disabled', 'true');
      document.getElementById('dateEcheance')?.setAttribute('disabled', 'true');
    }
  
    // Si l'utilisateur est un Chef de Projet, il peut modifier tous les champs
    if (this.userRole === 'ChefProjet') {
      document.getElementById('titre')?.removeAttribute('disabled');
      document.getElementById('description')?.removeAttribute('disabled');
      document.getElementById('statut')?.removeAttribute('disabled');
      document.getElementById('assignee')?.removeAttribute('disabled');
      document.getElementById('projet')?.removeAttribute('disabled');
      document.getElementById('dateEcheance')?.removeAttribute('disabled');
    }
  }
  
  onSubmit(): void {
    this.taskService.updateTask(this.task.id, this.task).subscribe(
      () => {
        alert('Tâche modifiée avec succès');
        this.router.navigate(['/tasks']);
      },
      (error) => {
        alert('Erreur lors de la modification de la tâche');
        console.error('Erreur:', error);
      }
    );
  }
}

