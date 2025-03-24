import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';   

@Component({
  selector: 'app-creer-user',
  templateUrl: './creer-user.component.html',
  styleUrls: ['./creer-user.component.css']
})
export class CreerUserComponent {
  user: any = {};  // Objet utilisateur vide pour le formulaire
  roles: string[] = ['EMPLOYE', 'MANAGER', 'ChefProjet'];  // Liste des rôles possibles

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // Soumettre le formulaire pour créer l'utilisateur
  onSubmit(): void {
    this.userService.createUser(this.user).subscribe({
      next: () => {
        alert('Utilisateur créé avec succès');
        this.router.navigate(['/users']);  // Redirige vers la liste des utilisateurs après la création
      },
      error: (err) => {
        alert('Erreur lors de la création de l\'utilisateur');
        console.error('Erreur:', err);
      }
    });
  }
}
