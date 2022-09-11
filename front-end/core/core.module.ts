import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from "./helpers/api.interceptor";
import { ServerTimeComponent } from "./components/server-time/server-time.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ServerTimeComponent],
    imports: [CommonModule, HttpClientModule],
    providers: [
        {
            // Use for intercepting all http requests from any of the apps.
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        }
    ],
    exports: [ServerTimeComponent]
})
export class CoreModule {}
