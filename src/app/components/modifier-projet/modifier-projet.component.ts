import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modifier-projet',
  templateUrl: './modifier-projet.component.html',
  styleUrls: ['./modifier-projet.component.css']
})
export class ModifierProjetComponent implements OnInit {
  projet: any = {
    id: null,
    nom: '',
    description: '',
    statut: '',
    chefProjet: { id: 0, nom: '', email: '', role: '' }
  };
  users: any[] = [];
  statutOptions: string[] = ['EN_COURS', 'A_FAIRE', 'TERMINEE'];
  userRole: string | null = null; // Récupérer le rôle de l'utilisateur

  constructor(
    private projetService: ProjetService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Assurez-vous d'avoir un service d'authentification
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole(); // Récupérer le rôle de l'utilisateur, vous pouvez l'adapter
    this.getProjets();
    this.getChefs();
  }

  getProjets(): void {
    const projetId = +this.route.snapshot.paramMap.get('id')!;
    this.projetService.getProjetById(projetId).subscribe(
      (data) => {
        this.projet = {
          ...data,
          chefProjet: data.chefProjet || { id: 0, nom: '', email: '', role: '' }
        };
        this.applyRolePermissions();
      },
      (error) => {
        console.error('Erreur lors de la récupération du projet', error);
      }
    );
  }

  getChefs(): void {
    this.userService.getChefs().subscribe(
      (data) => { this.users = data; },
      (error) => { console.error('Erreur lors de la récupération des chefs', error); }
    );
  }

  applyRolePermissions(): void {
    // Si l'utilisateur est Chef de projet, il ne peut modifier que le statut
    if (this.userRole === 'ChefProjet') {
      document.getElementById('nom')?.setAttribute('disabled', 'true');
      document.getElementById('description')?.setAttribute('disabled', 'true');
      document.getElementById('chefProjet')?.setAttribute('disabled', 'true');
    }

    // Si l'utilisateur est un Employé, tous les champs sont désactivés
    if (this.userRole === 'EMPLOYE') {
      document.getElementById('nom')?.setAttribute('disabled', 'true');
      document.getElementById('description')?.setAttribute('disabled', 'true');
      document.getElementById('statut')?.setAttribute('disabled', 'true');
      document.getElementById('chefProjet')?.setAttribute('disabled', 'true');
    }
    
    // Si l'utilisateur est un Manager, il peut modifier tout
    if (this.userRole === 'MANAGER') {
      document.getElementById('nom')?.removeAttribute('disabled');
      document.getElementById('description')?.removeAttribute('disabled');
      document.getElementById('statut')?.removeAttribute('disabled');
      document.getElementById('chefProjet')?.removeAttribute('disabled');
    }
  }

  onSubmit(): void {
    this.projetService.updateProjet(this.projet.id, this.projet).subscribe(
      () => {
        alert('Projet modifié avec succès');
        this.router.navigate(['/projets']);
      },
      (error) => {
        alert('Erreur lors de la modification du projet');
        console.error('Erreur:', error);
      }
    );
  }
}
