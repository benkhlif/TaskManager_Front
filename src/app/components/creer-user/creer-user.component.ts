import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';   

@Component({
  selector: 'app-creer-user',
  templateUrl: './creer-user.component.html',
  styleUrls: ['./creer-user.component.css']
})
export class CreerUserComponent {
  user: any = {};  // Objet utilisateur vide pour le formulaire
  roles: string[] = ['EMPLOYE', 'MANAGER', 'ChefProjet'];  // Liste des rôles possibles
isLoading: any;

  constructor(
     private authService: AuthService,
    private router: Router
  ) {}

  // Soumettre le formulaire pour créer l'utilisateur
 
onSubmit(): void {
  this.isLoading = true;  // Désactiver le bouton
  
  this.authService.register(this.user).subscribe({
    next: () => {
      alert('Utilisateur créé avec succès. Un mot de passe a été envoyé par email.');

      this.user = {}; // Réinitialisation du formulaire
      this.isLoading = false; // Réactiver le bouton

      setTimeout(() => {
        this.router.navigate(['/users']).then(() => {
          window.location.reload();
        });
      }, 500);
    },
    error: (err) => {
      alert('Erreur lors de la création de l\'utilisateur');
      console.error('Erreur:', err);
      this.isLoading = false; // Réactiver le bouton si erreur
    }
  });
}
}
