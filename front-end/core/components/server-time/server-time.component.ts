import { Component, Input } from '@angular/core';
import { Time } from 'core/interfaces/time.interface';
import { GlobalServerTimeService } from 'core/services/global-time.service';
@Component({
    selector: 'server-time',
    templateUrl: './server-time.component.html',
    styleUrls: ['./server-time.component.scss'],
})
export class ServerTimeComponent {
    /**
     * Set the timezone that you want to use as part of this component.
     * @usageNotes
     * #### Set a timezone
     * For example
     * * `timeZone="Europe/London";`
     * -OR-
     * * `[timeZone]="timezone";`
     */
    @Input() public set timeZone(value: string) {
        this._serverTimeService.locale = value;
    };

    /**
     * Get the current time object
     * @returns {Time | null}
     * #### Get the time
     * For example
     * * `{{time.localDateTime}}`
     */
    public time!: Time;

    public constructor(private _serverTimeService: GlobalServerTimeService) {}

    public ngOnInit(): void {
        // Subscribe to the server time from the global time service so we can get the last timestamp from the last api call
        this._serverTimeService.getAccurateTime().subscribe((time) => {
            this.time = time;
        });
    }

}
