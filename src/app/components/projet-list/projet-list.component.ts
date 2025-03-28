import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Projet, ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {
  projets: any[] = [];
  errorMessage: string = '';
  trackByProjectId!: TrackByFunction<Projet>;
  constructor(    
    private authService: AuthService,
    private projetService: ProjetService,
    private userService: UserService,
    private router: Router , private snackBar: MatSnackBar,
  ) {}
  userRole: string | null = null;

  ngOnInit(): void {
    this.getProjets();
  }

  // Charger les tâches et compléter les infos si nécessaire
  getProjets(): void {
    const role = this.authService.getRole();  // Vous devez avoir une méthode pour récupérer le rôle de l'utilisateur

    if (role === 'MANAGER') {
      this.projetService.getProjets().subscribe(
        projets => this.projets = projets,
        error => this.errorMessage = 'Erreur de chargement des tâches.'
      );
    } else if (role === 'ChefProjet') {
      this.projetService.getMyProjets().subscribe(
        projets => this.projets = projets,
        error => this.errorMessage = 'Erreur de chargement des tâches.'
      );
    }
    else {
      this.errorMessage = 'Rôle inconnu ou non autorisé.';
    }
  }

 // getProjets(): void {
   // this.projetService.getMyProjets().subscribe(
    // (data) => {
       // this.projets = data;
      //  this.projets.forEach(projet => this.fetchChefProjetDetails(projet));
     // },
    //  (error) => {
    //    console.error('Erreur lors de la récupération des projets', error);
    //  }
   // );
 // }

  fetchChefProjetDetails(projet: any) {
    if (projet.chefProjet && typeof projet.chefProjet === 'number') {
      this.userService.getUserById(projet.chefProjet).subscribe(
        (chefProjetData) => projet.chefProjet = chefProjetData,
        (error) => console.error(`Erreur lors du chargement du chefProjet ID ${projet.chefProjet}`, error)
      );
    }
  }
  
  onCreate(): void {
    this.router.navigate(['/creerprojet']);
  }
 
  modifier(projetId: number): void {
    this.router.navigate(['/modifierprojet', projetId]);
  }
  consulter(projetId: number): void {
    this.router.navigate([`/ficheprojet`, projetId]);
  }
  get projetsAFaire(): Projet[] {
      return this.projets?.filter(t => t.statut === 'A_FAIRE') || [];
    }
    
    get projetsEnCours(): Projet[] {
      return this.projets?.filter(t => t.statut === 'EN_COURS') || [];
    }
    
    get projetsTermines(): Projet[] {
      return this.projets?.filter(t => t.statut === 'TERMINEE') || [];
    }
   

   
supprimer(projetId: number): void {
  if (this.userRole !== 'MANAGER') {
    this.snackBar.open("⛔ Accès refusé : vous n'avez pas les droits pour supprimer un projet.", 'Fermer', {
      duration: 3000,
      verticalPosition: 'top',  // Affiche en haut de l'écran
      horizontalPosition: 'center', // Centré horizontalement
      panelClass: ['red-snackbar']
    });
    return;
  }

  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    this.projetService.deleteProjet(projetId).subscribe({
      next: () => {
        this.snackBar.open('✅ Projet supprimé avec succès', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['green-snackbar']
        });
        this.getProjets();
      },
      error: (err) => {
        this.snackBar.open('❌ Erreur lors de la suppression du projet', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar']
        });
        console.error('Erreur:', err);
      }
    });
  }
}
}
