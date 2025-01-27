// src/app/services/domaines/domaines.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Domaines} from '../../models/domaines';
import {BaseApiService} from '../../core/services/base-api.service';
import {API_CONFIG} from '../../core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DomainesService extends BaseApiService<Domaines> {
  constructor(http: HttpClient) {
    super(http, `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.domaines}`);
  }
}
