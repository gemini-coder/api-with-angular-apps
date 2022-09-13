import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment-timezone';
import { Time } from 'core/interfaces/time.interface';

@Injectable({
    providedIn: 'root',
})
export class GlobalServerTimeService {
    public locale: string = 'Europe/London';

    /**
     * Stores the current timestamp based on the server time
     */
    private _time!: number;

    /**
     * If there has been no api calls, will use the local system
     */
    private time$: Subject<Time> = new Subject<Time>();

    /**
     * Time to refresh the time
     */
    private pollTime = 200;

    /**
     * Subscribe to receive the timestamp from the last api call processed
     */
    private serverTime$: Subject<string> = new Subject<string>();

    /**
     * Last server poll
     */
    private _lastChecked!: string;

    public constructor() {
        this.serverTime$.subscribe((time) => {
            this._lastChecked = time;
            this._time = moment(time).valueOf();
            this.setTime();
        });

    }

    /**
     * Set the server time to make sure the application has the correct time
     * @param time
     */
    public setServerTime(time: string): void {
        this.serverTime$.next(time);
    }

    /**
     * Subscribe to get the accurate time. If no api calls have been made, will default to the local system time
     * @returns Observable Time
     */
    public getAccurateTime(): Observable<Time> {
        return this.time$.asObservable();
    }

    /**
     * Sets the time$ variable with the correct time
     */
    public setTime = (): void => {
        setInterval(() => {
            this._time = this._time + this.pollTime;
            this.time$.next({
                timeStamp: moment.tz(this._time, this.locale).valueOf(),
                localDateTime: moment.tz(this._time, this.locale).toLocaleString(),
                time: moment.tz(this._time, this.locale).format('HH:mm:ss'),
                date: moment.tz(this._time, this.locale).format('DD/MM/YYYY'),
                locale: this.locale,
                lastChecked: this._lastChecked,
            });
            this.setTime;
        }, this.pollTime);
    };

}
