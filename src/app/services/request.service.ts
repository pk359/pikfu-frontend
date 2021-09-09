import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { routePaths } from '../app-routing.module';
import { HttpLogger } from '../utils/http-logger.util';
import { LocalStorageService } from './local-storage.service';

export type RequestMethod = 'GET' | 'POST' | 'PATCH';
export enum StatusCodes {
  SUCCESS = 200,
}
@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {}
  async send<T>(
    method: RequestMethod,
    url: string,
    options?: { apiTimeout?: number; body?: any; headers?: any }
  ) {
    const { apiTimeout = 180000, body, headers } = options || {};

    const startTime = Date.now();
    if (!url.startsWith('http')) {
      url = `${environment.backendUrl}/${url}`;
    }

    let log: any = { method, url, apiTimeout, body, headers };
    
    HttpLogger.logInfo('REQUEST', 'SEND', log);
    let response = null as unknown as T;

    if (method === 'GET') {
      response = await this.http
        .get<T>(url, { headers })
        .pipe(timeout(apiTimeout))
        .toPromise();
    }

    if (method === 'POST') {
      response = await this.http
        .post<T>(url, body, { headers })
        .pipe(timeout(apiTimeout))
        .toPromise();
    }
    if (method === 'PATCH') {
      response = await this.http
        .patch<T>(url, body, { headers })
        .pipe(timeout(apiTimeout))
        .toPromise();
    }
    const endTime = Date.now();
    log = { ...log, result: response, timeUsed: `${endTime - startTime}ms` };

    HttpLogger.logSuccess('REQUEST', 'COMPLETE', {
      ...log,
    });

    if ((response as any)?.error?.code === 'TOKEN_EXPIRED' ) {
      this.localStorageService.removeItem('JWT_TOKEN');
      this.router.navigateByUrl(routePaths.loginPage);
    }

    return response;
  }
}
