// src/app/core/interfaces/data-service.interface.ts
import {Observable} from "rxjs";

export interface IDataService<T> {
  getAll(): Observable<T[]>;
  getById?(id: string | number): Observable<T>;
  create?(item: T): Observable<T>;
  update?(item: T): Observable<T>;
  delete?(id: string | number): Observable<boolean>;
}
