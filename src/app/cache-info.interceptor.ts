import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInfoInterceptor implements HttpInterceptor {

  constructor() {}
  cacheMap = new Map<string, HttpResponse<any>>();
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //return next.handle(request);
    const url = request.url;
    if (this.cacheMap.has(url)) {
      console.clear();

      console.log("Retrieving from cache");
      
      return of(this.cacheMap.get(url) as HttpResponse<any>);
    }
    else
    {
      return next.handle(request).pipe(
        tap(event => {
          console.log("Making a new request");
          
          if (event instanceof HttpResponse) {
            // set the map
            this.cacheMap.set(url, event);
          }
        })
      )
    }
  }
}
