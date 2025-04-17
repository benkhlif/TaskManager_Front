import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];  // Tableau pour stocker les notifications

  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  // Méthode pour récupérer les notifications
  fetchNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data.map(notification => ({
          ...notification,
          isRead: notification.isRead || false  // Assurez-vous que 'isRead' existe
        }));
      },
      error: (err) => console.error('Erreur lors de la récupération des notifications:', err)
    });
  }

  // Méthode pour afficher une icône en fonction de la notification
  getIcon(notification: any): string {
    return notification.type === 'task' ? '⚠️' : '✅';  // Exemple d'icône, ajustez selon vos besoins
  }

  // Méthode pour rediriger en fonction du type de notification
  onNotificationClick(notification: any): void {
    // Vérifier que notification.id existe bien avant de continuer
    const notificationId = notification.notificationId;  // Récupère l'ID de la notification cliquée
    if (!notificationId) {
      console.error('ID de la notification manquant');
      return;
    }
  
    // Redirection selon le type de la notification
    if (notification.type === 'task') {
      this.router.navigate(['/fichetask', notification.id]);  // Redirection vers la page de la tâche
    } else if (notification.type === 'projet') {
      this.router.navigate(['/ficheprojet', notification.id]);  // Redirection vers la page du projet
    }
  
    // Marquer la notification comme lue en utilisant son ID
    this.markAsRead(notificationId);  // Utilisez l'ID de la notification ici
  }
  

  // Méthode pour marquer une notification comme lue
  markAsRead(notificationId: number): void {
    console.log('ID de la notification à marquer comme lue:', notificationId);  // Vérification de l'ID
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        // Mise à jour locale de la notification pour qu'elle soit marquée comme lue
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;  // Mettre à jour le champ 'isRead'
        }
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la notification:', err);
      }
    });
  }
  
}
