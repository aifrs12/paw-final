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

  constructor(public itemsService: ItemsService) {}

  totalItems = 10;
  itemsPerPpage = 2;
  pageSizeOptions = [1 , 2 , 5 , 10];

  ngOnInit() {
    this.itemsService.getItems();
    this.itemsSub = this.itemsService.getItemUpdateListener()
    .subscribe((items: Item[]) => {
      this.items = items;
    });
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }

  onDelete(itemId: string) {
    this.itemsService.deleteItem(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }

}
