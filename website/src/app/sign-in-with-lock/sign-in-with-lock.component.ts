import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Auth0Lock } from 'auth0-lock';
import Auth0Lock from 'auth0-lock';

@Component({
    selector: 'app-sign-in-with-lock',
    templateUrl: './sign-in-with-lock.component.html'
})
export class SignInWithLockComponent implements OnInit {

    constructor(private router: Router) { }

    lock;

    ngOnInit() {
        this.lock = new Auth0Lock('BD20JFuWXCUW1ZVNsVYZbZKYS84T5oA4', 'sedonait.auth0.com', {
            container: 'root',
            auth: {
                redirectUrl: 'http://localhost:4200/sign-in-callback',    // If not specified, defaults to the current page 
                responseType: 'id_token token',
                params: {
                    scope: 'openid'                // Learn about scopes: https://auth0.com/docs/scopes
                }
            }
        });

        this.lock.on('authenticated', (authResult) => {
            console.log(authResult);
            
            const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', JSON.stringify(expiresAt));

            console.log('access_token: ' + authResult.accessToken);
            console.log('id_token: ' + authResult.idToken);
            console.log('expires_at: ' + expiresAt);

            // this.router.navigate(['']);
        });

        this.lock.show();
    }

}
