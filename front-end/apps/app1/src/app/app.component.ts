import { Component } from '@angular/core';
import { ApiService } from 'core/services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    /**
     * For setting the time zone in this component
     */
    public timeZone: string = 'Europe/London';

    public constructor(private _apiService: ApiService) {}

    /**
     * Call the api
     */
    public callApi(): void {
        this._apiService.getRoute().subscribe((result) => {
            // Logic from api call goes here
        });
    }
}
