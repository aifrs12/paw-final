import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class ItemsService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();

  constructor(private http: HttpClient) {}

  getItems() {
    this.http.get<{message: string, items: Item[]}>('http://localhost:3000/api/items')
    .subscribe((itemData) => {
      this.items = itemData.items;
      this.itemsUpdated.next([...this.items]);
    });
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  addItems(title: string, content: string) {
    const item: Item = {id: null, title: title, content: content};
    this.items.push(item);
    this.itemsUpdated.next([...this.items]);
  }
}
