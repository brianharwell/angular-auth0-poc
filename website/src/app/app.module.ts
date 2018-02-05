import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { SignInCallbackComponent } from './sign-in-callback/sign-in-callback.component';
import { HttpService } from './http.service';
import { WindowService } from './window.service';
import { SignInWithLockComponent } from './sign-in-with-lock/sign-in-with-lock.component';

@NgModule({
    declarations: [
        AppComponent,
        SignInCallbackComponent,
        HomeComponent,
        SignInCallbackComponent,
        SignInWithLockComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        HttpService,
        WindowService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
