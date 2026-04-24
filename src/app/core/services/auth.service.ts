import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { AuthResponse } from "../models";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/internal/operators/tap";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSignal = signal(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  register(email: string, password: string, username: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { email, password, username })
      .pipe(tap(response => this.saveToken(response.token)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(response => this.saveToken(response.token)));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSignal.set(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSignal.set(true);
  }
}
