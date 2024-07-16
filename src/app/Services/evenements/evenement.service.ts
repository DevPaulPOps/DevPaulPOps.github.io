import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { Evenements } from '../../models/evenements';
@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  URL: string = '/JSON/fr/evenements.json';
  constructor(private http: HttpClient) { }

  public getEvenements(): Observable<Evenements[]> {
    return this.http.get<Evenements[]>(this.URL);
  }
}
