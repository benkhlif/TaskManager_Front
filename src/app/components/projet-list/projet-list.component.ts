import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { Projet, ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

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
    private projetService: ProjetService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjets();
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (data) => {
        this.projets = data;
        this.projets.forEach(projet => this.fetchChefProjetDetails(projet));
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

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
  supprimer(projetId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(projetId).subscribe({
        next: () => {
          alert('Projet supprimé avec succès');
          this.getProjets(); // Mettre à jour la liste après suppression
        },
        error: (err) => {
          alert('Erreur lors de la suppression du projet');
          console.error('Erreur:', err);
        }
      });
    }
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
    
}
