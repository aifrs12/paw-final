import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Lance } from '../lances.model';
import { LancesService } from '../lances.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private userSub: Subscription;
  isLoading = false;
  totalUsers = 0;
  private authStatusSub: Subscription;
  userIsAuth = false;
  userId: string;
  totalGasto = 0;
  lances: Lance[] = [];
  lancesSub: Subscription;
  totalLances = 0;
  totalItems = 0;
  itemsPerPage = 2;
  currentPage = 1;

  constructor(
    private authService: AuthService, private lanceService: LancesService,
    private router: Router) { }

  ngOnInit() {

    this.isLoading = true;
    this.authService.getUsers();
    this.userId = this.authService.getUserId();
    this.userSub = this.authService.getUsersUpdated()
      .subscribe(
        (userData: { users: User[]; userCount: number }) => {

          this.totalUsers = userData.userCount;
          this.users = userData.users;
        }
      );
    this.userIsAuth = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuth = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

    this.lanceService.getLances(this.itemsPerPage, this.currentPage);
    this.lancesSub = this.lanceService
      .getPostUpdateListener()
      .subscribe(
        (lanceData: { lances: Lance[]; lanceCount: number }) => {
          this.totalLances = lanceData.lanceCount;
          this.lances = lanceData.lances;
        }
      );
  }


  onChangedPage(pageData: PageEvent) {
    this.authService.getUsers();

  }

  onDelete(userId: string) {
    this.isLoading = true;
    this.authService.deleteUser(userId).subscribe(() => {
      this.authService.getUsers();
    }, () => {
    });
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


}
