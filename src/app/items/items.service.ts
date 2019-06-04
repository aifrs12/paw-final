import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class ItemsService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();

  getItems() {
    return [...this.items];
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  addItems(title: string, content: string) {
    const item: Item = { title: title, content: content};
    this.items.push(item);
    this.itemsUpdated.next([...this.items]);
  }
}
