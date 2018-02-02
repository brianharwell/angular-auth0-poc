import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

import { WindowService } from './window.service';

@Injectable()
export class AuthService {

    constructor(private router: Router, private windowService: WindowService) {
        this.webAuth = new auth0.WebAuth({
            clientID: 'BD20JFuWXCUW1ZVNsVYZbZKYS84T5oA4',
            domain: 'sedonait.auth0.com',
            responseType: 'token id_token',
            audience: 'angular-poc-api',
            redirectUri: 'http://localhost:4200/sign-in-callback',
            scope: 'openid'
        })
    }

    webAuth;

    public debug() {
        console.log(this.webAuth);
    }

    public signIn() {
        this.webAuth.authorize();
    }

    public signOut() {
        this.webAuth.logout({});

        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public getToken() : string {        
        return localStorage.getItem('access_token');
    }

    public handleAuthentication() {
        this.webAuth.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                //window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['']);
            } else if (err) {
                this.router.navigate(['']);  
                console.log(err);              
            }
        });
    }

    private setSession(authResult): void {
        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));

        console.log('access_token: ' + authResult.accessToken);
        console.log('id_token: ' + authResult.idToken);
        console.log('expires_at: ' + expiresAt);
    }

    public isAuthenticated(): boolean {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

        return new Date().getTime() < expiresAt;
    }

    public refreshToken() {
        this.webAuth.checkSession({}, (err, result) => {
            if (err) {
                console.log(`Could not get a new token (${err.error}: ${err.error_description}).`);
            } else {
                console.log(`Successfully renewed auth!`);

                this.setSession(result);
            }
        });
    }
}
