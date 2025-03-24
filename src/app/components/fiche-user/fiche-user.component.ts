import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-fiche-user',
  templateUrl: './fiche-user.component.html',
  styleUrls: ['./fiche-user.component.css']
})
export class FicheUserComponent implements OnInit {
  user: User | undefined; // Utilisateur à afficher

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur à partir de l'URL
    const userId = +this.route.snapshot.paramMap.get('id')!;
    
    // Charger les données de l'utilisateur
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data; // Remplir la variable user avec les données récupérées
      },
      error: (err) => {
        alert('Erreur lors de la récupération des données de l\'utilisateur');
        console.error('Erreur:', err);
      }
    });
  }
}
