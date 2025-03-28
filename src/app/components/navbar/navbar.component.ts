import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;

  constructor(
     private authService: AuthService, 
   ) {}
  ngOnInit(): void {
    this.userRole = this.authService.getRole(); // Méthode qui récupère le rôle de l'utilisateur
  }
  isEmployeeOrHigher(): boolean {
    return this.userRole === 'EMPLOYEE' || this.isChefProjetOrHigher();
  }

  isChefProjetOrHigher(): boolean {
    return this.userRole === 'ChefProjet' || this.isManager();
  }

  isManager(): boolean {
    return this.userRole === 'MANAGER';
  }

  logout() {
    this.authService.logout();
  }
}
