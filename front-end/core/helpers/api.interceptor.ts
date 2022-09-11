import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GlobalServerTimeService } from 'core/services/global-time.service';
interface Response {
    data: any;
    time: string;
}
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private timeService: GlobalServerTimeService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<Response>> {
        // Return the api data back to the class that called it
        return next.handle(request).pipe(
            tap((res) => {
                // Check whether the response received is that of a HttpResponse
                if (res instanceof HttpResponse) {
                    // Store the server time header in a constant
                    const serverTime = res.headers.get('Server-Time');
                    if (serverTime){
                        // If the server time is part of the headers, then send this to the time service for any
                        // components that are subscribed
                        this.timeService.serverTime$.next(serverTime);
                    }
                }
            }),
            catchError((err: any) => {
                // Catch and errors from the api call and send back to the service
                return throwError(() => new Error(err));
            })
        );
    }
}
