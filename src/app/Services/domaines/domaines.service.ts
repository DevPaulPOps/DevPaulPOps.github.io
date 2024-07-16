import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domaines } from '../../models/domaines';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainesService {
  private URL = '/JSON/fr/domaines.json';

  constructor(private http: HttpClient) { }

  public getDomaines(): Observable<Domaines[]> {
    return this.http.get<Domaines[]>(this.URL);
  }
}
