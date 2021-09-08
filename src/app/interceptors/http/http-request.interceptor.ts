import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwtToken = this.localStorageService.getItem('JWT_TOKEN');

    const body = { ...req.body };

    let clonedAuthReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
      body,
    });

    if (jwtToken) {
      clonedAuthReq = req.clone({
        headers: req.headers.append('x-access-token', jwtToken),
      });
    }
    return next.handle(clonedAuthReq);
  }
}
