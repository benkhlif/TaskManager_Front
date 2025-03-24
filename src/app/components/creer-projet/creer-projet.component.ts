import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-creer-projet',
  templateUrl: './creer-projet.component.html',
  styleUrls: ['./creer-projet.component.css']
})
export class CreerProjetComponent {
  projet: any = { chefProjet: {} };
  users$ = this.userService.getChefs();  // Observable pour la liste des chefProjets

  constructor(
    private projetService: ProjetService,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.projetService.createProjet(this.projet).subscribe({
      next: () => {
        alert('Projet créé avec succès');
        this.router.navigate(['/projets']);
      },
      error: (err) => {
        alert('Erreur lors de la création du projet');
        console.error('Erreur:', err);
      }
    });
  }
}
