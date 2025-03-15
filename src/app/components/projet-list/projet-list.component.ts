import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {
  projets: any[] = [];

  constructor(
    private projetService: ProjetService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProjets();
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (data) => {
        this.projets = data;
        this.projets.forEach(projet => this.fetchManagerDetails(projet));
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  fetchManagerDetails(projet: any) {
    if (projet.manager && typeof projet.manager === 'number') {
      this.userService.getUserById(projet.manager).subscribe(
        (managerData) => projet.manager = managerData,
        (error) => console.error(`Erreur lors du chargement du manager ID ${projet.manager}`, error)
      );
    }
  }
}
