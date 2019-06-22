import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  UserIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private admin: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAutenticated => {
      this.UserIsAuthenticated = isAutenticated;
    });
  }

  ifisAdmin() {
    if (this.authService.getIfisAdmin()) {
      this.admin = true;
      return this.admin;
    }
  }

  onLogout() {
    this.authService.logout();
    this.admin = false;
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.admin = false;
  }
}
