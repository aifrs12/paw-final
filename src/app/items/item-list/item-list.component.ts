import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Item } from '../item.model';
import { ItemsService } from '../items.service';

import { PageEvent, getMatIconFailedToSanitizeUrlError } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  isLoading = false;
  totalItems = 10;
  itemsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1 , 2 , 5 , 10];
  userIsAutenticated = false;
  private itemsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public itemsService: ItemsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getItems(this.itemsPerPage, 1);
    this.itemsSub = this.itemsService.getItemUpdateListener()
    .subscribe((items: Item[]) => {
      this.isLoading = false;
      this.items = items;
    });
    this.userIsAutenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAutenticated => {
      this.userIsAutenticated = isAutenticated;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.itemsPerPage = pageData.pageSize;
    this.itemsService.getItems(this.itemsPerPage, this.currentPage);
  }

  onDelete(itemId: string) {
    this.itemsService.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
