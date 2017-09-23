import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {AuthenticatedHttpService} from "./http-interceptor";
import {Http} from '@angular/http';
import {routing} from "./app.routing";
import {PagesModule} from "./pages/pages.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        PagesModule,
        routing
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        CookieService,
        {
            provide: Http,
            useClass: AuthenticatedHttpService,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
