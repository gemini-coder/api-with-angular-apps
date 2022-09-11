import { Component } from '@angular/core';
import { ApiService } from 'core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app1';

  constructor(private _apiService: ApiService) {}

  public ngOnInit(): void {
    this._apiService.getRoute().subscribe((result => {
      // Logic from api call goes here
    }))
  }

}
