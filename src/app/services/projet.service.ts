import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export interface Projet {
  id: number;
  nom: string;
  description: string;
  statut: string;
  chefProjet?: { id: number, nom: string, email: string, role: string };
}
@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://localhost:8080/projets';  

  constructor(private http: HttpClient, private authService: AuthService) {}
 
  private getHeaders(): HttpHeaders {
    const headers = this.authService.createAuthorizationHeader();
    if (!headers) {
      console.error('Erreur : Aucun token JWT trouvé.');
      return new HttpHeaders();
    }
    return headers;
  }

  // 🔹 Récupérer les projets de l'utilisateur connecté
  getMyProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.baseUrl}/chefprojet/me`, { headers: this.getHeaders() });
  }

  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** Récupérer tous les projets
  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  } */
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
  /** Créer un nouveau projet */
  createProjet(projet: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, projet, { headers: this.getHeaders() });
  }

  /** Mettre à jour un projet */
  updateProjet(id: number, projet: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, projet, { headers: this.getHeaders() });
  }

  /** Supprimer un projet */
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}