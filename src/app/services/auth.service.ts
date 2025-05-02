import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = environment.BASE_URL+'/api/v1/user';
  private authTokenKey = 'auth_token';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated()); 

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // ✅ Login method
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setAuthToken(response.token);
        }
      })
    );
  }

  // ✅ Signup method
  signUp(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, userData);
  }

  // ✅ Store Auth Token and update auth status
  setAuthToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.authTokenKey, token);
      this.authStatus.next(true);
    } else {
      localStorage.removeItem(this.authTokenKey);
      this.authStatus.next(false);
    }
  }

  // ✅ Get Auth Token
  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // ✅ Check if User is Authenticated
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // ✅ Get auth status as Observable
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // ✅ Logout method
  logout(): void {
    this.setAuthToken(null);
  }

  // ✅ Extraire le `subject` (username) depuis le token JWT
  getUsername(): string | null {
    const token = this.getAuthToken();
    if (token) {
      try {
        const decodedToken: any = this.jwtHelper.decodeToken(token);
        return decodedToken.sub; // Assurez-vous que `sub` est bien présent dans le token
         } catch (error) {
          console.error('❌ Erreur lors du décodage du token', error);
          return null;
        }
      }
    return null;
  }

  // ✅ Get User Details
  getUserDetails(): Observable<any> {
  return this.http.get<any>(`${this.BASE_URL}/me`);
}

  // ✅ Send Password Reset Email
  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/forgot-password`, { email });
  }

}
