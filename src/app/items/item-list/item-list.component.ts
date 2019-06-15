import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Item } from '../item.model';
import { ItemsService } from '../items.service';

import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
 /* items = [
    {title: 'Leilão numero 1', content: 'Este é o Leilão numero 1'},
    {title: 'Leilão numero 2', content: 'Este é o Leilão numero 2'},
    {title: 'Leilão numero 3', content: 'Este é o Leilão numero 3'},
  ]
  */

  items: Item[] = [];
  private itemsSub: Subscription;
  isLoading = false;
  constructor(public itemsService: ItemsService) {}

  totalItems = 10;
  itemsPerPage = 5;
  pageSizeOptions = [1 , 2 , 5 , 10];
  currentPage = 1;
  ngOnInit() {
    this.isLoading = true;
    this.itemsService.getItems(this.itemsPerPage, 1);
    this.itemsSub = this.itemsService.getItemUpdateListener()
    .subscribe((items: Item[]) => {
      this.isLoading = false;
      this.items = items;
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
  }

}
