import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

const BASE_URL = 'http://localhost:8080/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const headers = this.authService.createAuthorizationHeader();
    if (!headers) {
      console.error('Erreur : Aucun token JWT trouvé.');
      return new HttpHeaders(); // Retourne des headers vides si aucun token n'est trouvé
    }
    return headers;
  }

  // Récupérer les notifications du chef de projet connecté
  getNotifications(): Observable<any[]> {
    return this.authService.getUserId().pipe(
      switchMap((userId) => {
        if (!userId) {
          return of([]); // Si l'ID de l'utilisateur est null, on retourne une liste vide
        }
        return this.http.get<any[]>(`${BASE_URL}/alerte/${userId}`, { headers: this.getHeaders() }).pipe(
          catchError(error => {
            console.error('Erreur lors de la récupération des notifications:', error);
            return of([]); // Retourner une liste vide en cas d'erreur
          })
        );
      })
    );
  }

  // Marquer la notification comme lue
  markAsRead(notificationId: number): Observable<any> {
    const url = `${BASE_URL}/mark-as-read/${notificationId}`;
    console.log('URL de l\'API:', url);  // Vérification de l'URL
    return this.http.put<any>(url, {}, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la mise à jour de la notification:', error);
          return of(null);  // Retourner null en cas d'erreur
        })
      );
  }
  
  // Récupérer le nombre de notifications non lues
  getUnreadNotificationCount(): Observable<any> {
    return this.authService.getUserId().pipe(
      switchMap((userId) => {
        if (!userId) {
          return of(0); // Si l'ID de l'utilisateur est null, retourne 0
        }
        return this.http.get<any[]>(`${BASE_URL}/alerte/${userId}`, { headers: this.getHeaders() }).pipe(
          map((notifications) => {
            // Filtrer les notifications non lues et retourner leur nombre
            return notifications.filter(n => !n.isRead).length;
          }),
          catchError(error => {
            console.error('Erreur lors de la récupération des notifications non lues:', error);
            return of(0); // Retourne 0 en cas d'erreur
          })
        );
      })
    );
  }
}
