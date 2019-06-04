import { Injectable } from '@angular/core';

import { Item } from './item.model';

@Injectable({providedIn: 'root'})
export class ItemsService {
  private items: Item[] = [];

  getItems() {
    return [...this.items];
  }

  addItems(title: string, content: string) {
    const item: Item = { title: title, content: content};
    this.items.push(item);
  }
}
