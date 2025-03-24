import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';
 
@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.css']
})
export class ModifierUserComponent implements OnInit {
  user: User = { id: 0, nom: '', email: '', password: '', role: '' };  // Initialisation de l'utilisateur
  roles: string[] = ['EMPLOYE', 'MANAGER', 'ChefProjet'];  // Liste des rôles
  passwordVisible: boolean = false; // Contrôleur pour afficher/masquer le mot de passe

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur à partir de l'URL
    const userId = +this.route.snapshot.paramMap.get('id')!;

    // Charger les données de l'utilisateur
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;  // Remplir le formulaire avec les données existantes de l'utilisateur
      },
      error: (err) => {
        alert('Erreur lors de la récupération des données de l\'utilisateur');
        console.error('Erreur:', err);
      }
    });
  }

  onSubmit(): void {
    // Soumettre les modifications pour l'utilisateur
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: () => {
        alert('Utilisateur modifié avec succès');
        this.router.navigate(['/users']);  // Rediriger vers la liste des utilisateurs après modification
      },
      error: (err) => {
        alert('Erreur lors de la modification de l\'utilisateur');
        console.error('Erreur:', err);
      }
    });
  }
   // Méthode pour basculer la visibilité du mot de passe
   togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
