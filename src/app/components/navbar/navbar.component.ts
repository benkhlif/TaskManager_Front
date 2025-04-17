import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;
  unreadCount: number = 0;  // Compteur de notifications non lues

  constructor(
     private authService: AuthService, private notificationService: NotificationService,
   ) {}
  ngOnInit(): void {
    this.userRole = this.authService.getRole(); // Méthode qui récupère le rôle de l'utilisateur
    this.fetchUnreadCount();

  }

  fetchUnreadCount(): void {
    this.notificationService.getUnreadNotificationCount().subscribe({
      next: (count) => {
        this.unreadCount = count;  // Mettre à jour le compteur de notifications non lues
      },
      error: (err) => console.error('Erreur lors de la récupération du nombre de notifications non lues:', err)
    });
  }


  isEmployeeOrHigher(): boolean {
    return this.userRole === 'EMPLOYE' || this.isChefProjetOrHigher();
  }

  isChefProjetOrHigher(): boolean {
    return this.userRole === 'ChefProjet' || this.isManager();
  }
  isChefProjet(): boolean {
    return this.userRole === 'ChefProjet';
  }
  isManager(): boolean {
    return this.userRole === 'MANAGER';
  }
  isEmplyee(): boolean {
    return this.userRole === 'EMPLOYE';
  }
  logout() {
    this.authService.logout();
  }
}
