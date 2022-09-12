import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/app1/src/environments/environment';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
/**
 * Service to store all the public api requests for this application
 */
export class ApiService {
    // Base endpoint for the api services
    private _baseEndpoint = environment.apiUrl;

    public constructor(private _http: HttpClient) {}

    /**
     * Get the data from the demo api call
     * @returns Get the demo api endpoint
     * @throws an error with the call
     */
    public getRoute(): Observable<any> {
        return this._http.get(`${this._baseEndpoint}`).pipe(
            map((result) => {
                // Return the body of the api
                return result;
            }),
            catchError((error) => {
                // Return an error
                return throwError(() => new Error(error));
            })
        );
    }
}
