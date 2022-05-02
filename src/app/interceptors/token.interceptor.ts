import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Don't set token for special requests
        if (request.headers.has('X-no-middleware')) {
            const newHeaders = request.headers.delete('X-no-middleware');
            request = request.clone({
                    headers: newHeaders
            });
            return next.handle(request);
        }

        const token = this.tokenService.getToken();
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(request);
    }
}