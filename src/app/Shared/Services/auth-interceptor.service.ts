import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private userAccessToken: string = '';

  constructor(private store: Store<AppState>) {
    this.store.select('auth').subscribe((auth) => {
      this.userAccessToken = auth ? auth.access_token : '';
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let token = this.userAccessToken
    if (!token) {
      const apiToken = localStorage.getItem('api_token');
      if (apiToken) {
        token = apiToken
      }
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
