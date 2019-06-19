import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable ({ providedIn: 'root' })
export class AuthService {
  private isAutenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  getIsAuth() {
    return this.isAutenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post('http://localhost:3000/api/user/signup/', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login/', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token) {
        this.isAutenticated = true;
        this.authStatusListener.next(true);
      }
    });
  }
}
