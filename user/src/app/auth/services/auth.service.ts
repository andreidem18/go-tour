import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { LoginRes } from '../interfaces/LoginRes';
import { Credentials } from '../interfaces/Credentials';
import { AuthStatus } from '../interfaces/authStatus.enum';
import { CreateUser } from '../interfaces/CreateUser';
import { getFormData } from 'src/app/shared/helpers/getFormData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private _loggedUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.pending);

  public loggedUser = computed(() => this._loggedUser());
  public authStatus = computed(() => this._authStatus());

  login(credentials: Credentials): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(res => this._loggedUser.set(res.user)),
        tap(res => localStorage.setItem('token', res.token)),
        tap(() => this._authStatus.set(AuthStatus.authenticated))
      )
  }

  authenticate(): void {
    if(!localStorage.getItem('token')) {
      this.logout();
      return;
    }
    this.http.get<LoginRes>(`${this.apiUrl}/auth/renew`)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this._loggedUser.set(res.user);
          this._authStatus.set(AuthStatus.authenticated);
        },
        error: () => {
          console.log("Me ejecuté!");
          this.logout();
          this._authStatus.set(AuthStatus.notAuthenticated);
        }
      })
  }

  logout(): void {
    localStorage.setItem('token', '');
    this._loggedUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  createUser(user: CreateUser): Observable<User> {
    const formData = getFormData(user);
    return this.http.post<User>(`${this.apiUrl}/auth/signup`, formData);
  }
}
