import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private projetService: ProjetService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
