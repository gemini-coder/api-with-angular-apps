import { Component, Input } from '@angular/core';
import { GlobalServerTimeService } from 'core/services/global-time.service';
import * as moment from 'moment-timezone';
@Component({
    selector: 'server-time',
    templateUrl: './server-time.component.html',
    styleUrls: ['./server-time.component.scss'],
})
export class ServerTimeComponent {
    /**
     * Set the timezone that you want to use as part of this component.
     * This will change the timezone for the global time service
     */
    @Input() public set timeZone(value: string) {
        this._timeZone = value;
        this._serverTimeService.timeZone = this._timeZone;
    }
    /**
     * Get the current timeZone for this component
     */
    public get timeZone(): string {
        return this._timeZone;
    }

    // the server time from the global time service.
    public serverTime!: string;
    // the current time from the global time service
    public currentTime!: string;
    // the timezone that we want to use for formatting the times
    private _timeZone: string = 'Europe/London';

    constructor(private _serverTimeService: GlobalServerTimeService) {}

    ngOnInit(): void {
        // Subscribe to the server time from the global time service so we can get the last timestamp from the last api call
        this._serverTimeService.serverTime$.subscribe((time) => {
            this.serverTime = moment.tz(time, this.timeZone).toLocaleString();
        });
        // Subscribe to the current time so that we can change our clock in the component
        this._serverTimeService.currentTime$.subscribe((currentTime) => {
            this.currentTime = currentTime;
        });
    }
}
