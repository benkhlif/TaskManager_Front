import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User {
   id: number;
  nom: string;
  email: string;
  password: string;
  role: string; // EMPLOYE, MANAGER, ChefProjet
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
  getChefs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/chefProjet`);
  }
  getEmployee(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/employee`);
  }
}
