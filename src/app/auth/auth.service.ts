import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../user.model';

@Injectable ({ providedIn: 'root' })
export class AuthService {
  private isAutenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private userId: string;
  admin = false;

  private users: User[] = [];
  private usersUpdated = new Subject<{users: User[], userCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}


  getIsAuth() {
    return this.isAutenticated;
  }

  getUserId() {
    return this.userId;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIfisAdmin() {
    return this.admin;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post('http://localhost:3000/api/user/signup/', authData)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }

  getUsers() {this.http.get<{ message: string; users: any; maxUsers: number }>('http://localhost:3000/api/user/listar/')
      .pipe(map((usersData) => {
        return {
          users: usersData.users.map((user: { _id: any; email: any; }) => {
            return {
              id: user._id,
              email: user.email
            };
          }),
          maxUsers: usersData.maxUsers
        };
      })
    )
      .subscribe(transformedUsersData => {
        this.users = transformedUsersData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUsersData.maxUsers
        });
      });
  }

  getUsersUpdated() {
    return this.usersUpdated.asObservable();
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.router.navigate(['/']);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAutenticated = true;
      this.userId = authInformation.userId;
      if (this.userId === '5d0e871bc73ce2225948d51b') {
        this.admin = true;
        this.authStatusListener.next(true);
      }
      this.authStatusListener.next(true);
    } else {
      this.router.navigate(['/']);
    }
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post<{token: string, userid: string, userId: string}>('http://localhost:3000/api/user/login/', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.getUsers();
      if (token) {
        this.isAutenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        this.saveAuthenticationData(token, this.userId);
        if (this.userId === '5d0e871bc73ce2225948d51b') {
          this.admin = true;
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
      this.router.navigate(['/']);
    });
  }

  private saveAuthenticationData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expirationDate) {
      this.router.navigate(['/login']);
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  logout() {
    this.token = null;
    this.isAutenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.admin = false;
    this.router.navigate(['/']);
  }

  deleteUser(userId: string) {
    return this.http.delete('http://localhost:3000/api/user/listar/' + userId);
  }

}
