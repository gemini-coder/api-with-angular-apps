import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment-timezone';

@Injectable({
    providedIn: 'root',
})
export class GlobalServerTimeService {
    /**
     * Subscribe to receive the timestamp from the last api call processed
    */
    public serverTime$: Subject<string> = new Subject<string>();

    /**
     * Subscribe to get the current date and time for the timezone provided
     */
    public currentTime$: Subject<string> = new Subject<string>();

    /**
     * Set the timezone that you want to use for any times in this service
     */
    public timeZone: string = 'Europe/London';

    constructor() {
        // Start up the current time subject
        this.getDateTime();
    }

    /**
     * Process the current date time repeating every 500ms to ensure accuracy
     */
    private getDateTime = (): void => {
        const dateTime = moment.tz(new Date(), this.timeZone).toLocaleString();
        this.currentTime$.next(dateTime);
        setTimeout(this.getDateTime, 500);
    };
}
