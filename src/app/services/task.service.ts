import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
 export interface Task {
  id?: number;
  titre: string;
  description: string;
  statut: 'A_FAIRE' | 'EN_COURS' | 'TERMINEE';
  dateEcheance: string;  
  assignee?: { id: number, nom?: string };  
  projet?: { id: number, nom?: string };  

}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const headers = this.authService.createAuthorizationHeader();
    if (!headers) {
      console.error('Erreur : Aucun token JWT trouvé.');
      return new HttpHeaders();
    }
    return headers;
  }

  // 🔹 Récupérer les tâches de l'employee connecté
  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/employee/me`, { headers: this.getHeaders() });
  }

 // 🔹 Récupérer les tâches de chef e projet connecté
 getChefDeProjetTasks(): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.apiUrl}/chefprojet/me/tasks`, { headers: this.getHeaders() });
}

 


  // 🔹 Récupérer toutes les tâches 
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // 🔹 Récupérer une tâche par ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // 🔹 Créer une nouvelle tâche
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { headers: this.getHeaders() });
  }

  // 🔹 Modifier une tâche existante
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { headers: this.getHeaders() });
  }

  // 🔹 Supprimer une tâche
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // 🔹 Récupérer les tâches d'un projet spécifique
  getTasksByProject(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/byProject/${id}`, { headers: this.getHeaders() });
  }
}
