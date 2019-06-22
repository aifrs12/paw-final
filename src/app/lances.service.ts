import { Lance } from './lances.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Estado } from '../app/Enums/estado';


const BACKEND_URL = 'http://localhost:3000/api/lance/';

@Injectable({ providedIn: 'root' })
export class LancesService {
  private lances: Lance[] = [];

  private lanceUpdate = new Subject<{ lances: Lance[], lanceCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getLances(lancesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${lancesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; lances: any; maxLances: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((lancesData) => {
          return {
            lances: lancesData.lances.map(lance => {
              return {
                id: lance._id,
                user: lance.user,
                valor: lance.valor,
                estado: lance.estado
              };
            }),
            maxLances: lancesData.maxLances
          };
        })
      )
      .subscribe(transformedLancesData => {
        this.lances = transformedLancesData.lances;
        this.lanceUpdate.next({
          lances: [...this.lances],
          lanceCount: transformedLancesData.maxLances
        });
      });
  }

  getLance(id: string) {
    return this.http.get<{
      _id: string;
      user: string;
      valor: number;
      estado: Estado;
    }>(BACKEND_URL + id);
  }


  getPostUpdateListener() {
    return this.lanceUpdate.asObservable();
  }

  addLance(
    user: string,
    valor: number,
    estado: Estado
  ) {
    const lance: Lance = {
      id: null,
      user,
      valor,
      estado,
     // creator : null


    };
    console.log(lance);
    this.http.post<{ message: string, lanceId: string }>(BACKEND_URL, lance
    )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }
}

