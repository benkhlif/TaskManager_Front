import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,     private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  supprimer(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        (error) => {
          console.error(`Erreur lors de la suppression de l'utilisateur ID ${id}`, error);
        }
      );
    }
  }
  onCreate(): void {
    this.router.navigate(['/creeruser']);
  }
  modifier(projetId: number): void {
    this.router.navigate(['/modifieruser', projetId]);
  }
  consulter(projetId: number): void {
    this.router.navigate([`/ficheuser`, projetId]);
  }
}
