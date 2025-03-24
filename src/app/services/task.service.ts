import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  // Récupérer toutes les tâches
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Récupérer une tâche par son ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle tâche
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Modifier une tâche existante
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // Supprimer une tâche
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

    // Récupérer une tâche par son ID
    getTasksByProject(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/byProject/${id}`);
    }
}