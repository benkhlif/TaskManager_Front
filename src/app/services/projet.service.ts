import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  /** Récupérer tous les projets */
  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseUrl}/${id}`);
  }
  /** Créer un nouveau projet */
  createProjet(projet: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, projet);
  }

  /** Mettre à jour un projet */
  updateProjet(id: number, projet: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, projet);
  }

  /** Supprimer un projet */
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}