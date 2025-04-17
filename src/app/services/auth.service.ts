import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService   {
 
  private tokenKey = 'jwt';  // Utilisation de 'jwt' comme clé
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const jwt = localStorage.getItem(this.tokenKey);
    this._isLoggedIn$.next(!!jwt);
  }
  register(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signupRequest, { responseType: 'text' });
  }
 
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest).pipe(
      tap((response: any) => {
        if (response.jwtToken) {  // Utilisation de 'response.jwtToken'
          this.setToken(response.jwtToken);
          this._isLoggedIn$.next(true);
        }
      })
    );
  }
    // Récupérer le token JWT

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  // Décoder le token JWT

  get decodedToken(): any {
    const token = this.token;
    if (!token) return null;
    try {
      const payload = atob(token.split('.')[1]);
      console.log('Decoded payload:', payload); // Affichez le payload pour vérification
      return JSON.parse(payload);
    } catch (e) {
      console.error("Erreur lors du décodage du token:", e);
      return null;
    }
  }

   // Méthode pour récupérer le rôle de l'utilisateur à partir du token
   getRole(): string | null {
    const decodedToken = this.decodedToken;
    return decodedToken ? decodedToken.roles : null;
  }
  getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${BASE_URL}api/idByEmail?email=${email}`);
  }
  

  getUserId(): Observable<number | null> {
    const email = this.decodedToken?.sub;
    if (email) {
      return this.getUserIdByEmail(email);
    } else {
      return of(null);
    }
  }
  

  private setToken(jwtToken: string): void {
    localStorage.setItem(this.tokenKey, jwtToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    const confirmLogout = confirm('Voulez-vous vraiment vous déconnecter ?');
    if (confirmLogout) {
      localStorage.removeItem(this.tokenKey);
      this._isLoggedIn$.next(false);
      this.router.navigate(['/login']);
     }
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  createAuthorizationHeader(): HttpHeaders | null {
    const jwtToken = this.getToken();
    if (jwtToken) {
      return new HttpHeaders().set("Authorization", "Bearer " + jwtToken);
    } else {
      return null;
    }
  }

  
 
   
}