import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-sign-in-callback',
    templateUrl: './sign-in-callback.component.html'
})
export class SignInCallbackComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.handleAuthentication();
    }

}
