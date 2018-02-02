import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthService, private httpService: HttpService) { }

    ngOnInit() {
    }

    subscription: Subscription;

    get isAuthenticated() : boolean {
        return this.authService.isAuthenticated();
    }

    signIn() {
        this.authService.signIn();
    }

    signOut() {
        this.authService.signOut();
    }

    debug() {
        this.authService.debug();
    }

    refreshToken() {
        this.authService.refreshToken();
    }

    automaticTokenRefresh() {
        const expiration = Number(localStorage.getItem('expires_at'));
        
        let observable = Observable.of(expiration)
            .mergeMap(val => {
                console.log('Refreshing in 15 seconds...');

                return Observable.timer(15000);
            });

        this.subscription = observable.subscribe(() => {
            this.authService.refreshToken();
            this.automaticTokenRefresh();
        });
    }

    callApi() {
        const token = this.authService.getToken();

        this.httpService.callApi(token)
            .subscribe(data => console.log(data));
    }

}
