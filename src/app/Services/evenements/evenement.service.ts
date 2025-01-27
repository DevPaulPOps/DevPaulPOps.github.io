// src/app/services/evenements/evenement.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Evenements} from '../../models/evenements';
import {BaseApiService} from '../../core/services/base-api.service';
import {API_CONFIG} from '../../core/config/api.config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})
export class EvenementService extends BaseApiService<Evenements> {
  constructor(http: HttpClient) {
    super(http, `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.evenements}`);
  }
}
