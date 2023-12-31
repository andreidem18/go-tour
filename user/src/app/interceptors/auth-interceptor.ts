import { Injectable, inject } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('token');

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken || ""),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
