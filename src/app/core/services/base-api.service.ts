// src/app/core/services/base-api.service.ts
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IDataService} from '../interfaces/data-service.interface';

@Injectable()
export abstract class BaseApiService<T> implements IDataService<T> {
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(item: T): Observable<T> {
    const id = (item as any).id;
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: string | number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
