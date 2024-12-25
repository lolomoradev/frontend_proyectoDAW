// src/app/interceptors/jwt.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('[JwtInterceptor] Intercepting => ', req.url);
    const token = this.loginService.getToken();
    if (token) {
      const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
      console.log('[JwtInterceptor] - Token:', token);
      return next.handle(authReq);
    }
    console.log('[JwtInterceptor] - No token present');
    return next.handle(req);
  }
  
  
}
