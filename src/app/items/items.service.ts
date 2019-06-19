import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';

import { Item } from './item.model';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ItemsService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<{items: Item[], itemCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getItems(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http
    .get<{message: string, items: any, maxItems: number}>('http://localhost:3000/api/items/' + queryParams)
    .pipe(
      map((itemData) => {
      return {items: itemData.items.map(item => {
        return {
          title: item.title,
          content: item.content,
          id: item._id,
          creator: item.creator
        };
      }), maxItems: itemData.maxItems};
    })
    )
    .subscribe((tansformedItemData) => {
      console.log(tansformedItemData);
      this.items = tansformedItemData.items;
      this.itemsUpdated.next({
        items: [...this.items],
        itemCount: tansformedItemData.maxItems
      });
    });
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  getItem(id: string) {
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/items/' + id);
  }

  addItems(title: string, content: string) {
    const item: Item = { id: null, title, content };
    this.http.post<{message: string, itemId: string}>('http://localhost:3000/api/items/', item)
    .subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }

  updateItem(id: string, title: string, content: string) {
    const item: Item = { id, title, content };
    this.http
      .put('http://localhost:3000/api/items/' + id, item)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteItem(itemId: string) {
    return this.http
    .delete('http://localhost:3000/api/items/' + itemId);
  }
}
